import 'package:path/path.dart';
import 'package:sqflite/sqflite.dart';
import '../models/models.dart';

/// Toda a persistência local do UP.PRO (SQLite via sqflite).
/// Funciona 100% offline: histórico de treino, séries/cargas e perfil não
/// dependem de login nem de internet. A sincronização na nuvem (Fase 2 —
/// ver ROADMAP.md) troca só a camada de sync, não este contrato.
class DatabaseService {
  DatabaseService._();
  static final DatabaseService instance = DatabaseService._();

  Database? _db;

  Future<Database> get database async {
    _db ??= await _open();
    return _db!;
  }

  Future<Database> _open() async {
    final dir = await getDatabasesPath();
    final path = join(dir, 'uppro.db');
    return openDatabase(
      path,
      version: 1,
      onCreate: (db, version) async {
        await db.execute('''
          CREATE TABLE user_profile (
            id INTEGER PRIMARY KEY CHECK (id = 1),
            name TEXT NOT NULL DEFAULT '',
            heightCm REAL,
            weightKg REAL,
            goal TEXT NOT NULL DEFAULT 'hipertrofia',
            level TEXT NOT NULL DEFAULT 'iniciante',
            streakDays INTEGER NOT NULL DEFAULT 0,
            lastWorkoutDate TEXT,
            totalPoints INTEGER NOT NULL DEFAULT 0,
            onboardingDone INTEGER NOT NULL DEFAULT 0,
            selectedPlanIds TEXT NOT NULL DEFAULT ''
          )
        ''');
        await db.execute('''
          CREATE TABLE workout_sessions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            planId TEXT NOT NULL,
            planName TEXT NOT NULL,
            startedAt TEXT NOT NULL,
            finishedAt TEXT,
            pointsEarned INTEGER NOT NULL DEFAULT 0
          )
        ''');
        await db.execute('''
          CREATE TABLE set_logs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            sessionId INTEGER NOT NULL,
            exerciseId TEXT NOT NULL,
            exerciseName TEXT NOT NULL,
            setIndex INTEGER NOT NULL,
            reps INTEGER NOT NULL,
            weightKg REAL NOT NULL,
            completedAt TEXT NOT NULL
          )
        ''');
        await db.execute('''
          CREATE TABLE equipment_log (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            muscleGroup TEXT NOT NULL,
            description TEXT NOT NULL,
            photoPath TEXT,
            scannedAt TEXT NOT NULL
          )
        ''');
      },
    );
  }

  // ---------------------------------------------------------------- Perfil

  Future<UserProfile> getProfile() async {
    final db = await database;
    final rows = await db.query('user_profile', where: 'id = 1');
    if (rows.isEmpty) {
      await db.insert('user_profile', {'id': 1, ...const UserProfile().toMap()});
      return const UserProfile();
    }
    return UserProfile.fromMap(rows.first);
  }

  Future<void> saveProfile(UserProfile profile) async {
    final db = await database;
    await db.insert(
      'user_profile',
      {'id': 1, ...profile.toMap()},
      conflictAlgorithm: ConflictAlgorithm.replace,
    );
  }

  Future<List<String>> getSelectedPlanIds() async {
    final db = await database;
    final rows = await db.query('user_profile', columns: ['selectedPlanIds'], where: 'id = 1');
    if (rows.isEmpty) return [];
    final raw = rows.first['selectedPlanIds'] as String? ?? '';
    return raw.isEmpty ? [] : raw.split(',');
  }

  Future<void> setSelectedPlanIds(List<String> ids) async {
    final db = await database;
    await db.update('user_profile', {'selectedPlanIds': ids.join(',')}, where: 'id = 1');
  }

  // -------------------------------------------------------------- Sessões

  Future<int> startSession({required String planId, required String planName}) async {
    final db = await database;
    return db.insert('workout_sessions', {
      'planId': planId,
      'planName': planName,
      'startedAt': DateTime.now().toIso8601String(),
      'finishedAt': null,
      'pointsEarned': 0,
    });
  }

  Future<void> finishSession(int sessionId, {required int pointsEarned}) async {
    final db = await database;
    await db.update(
      'workout_sessions',
      {'finishedAt': DateTime.now().toIso8601String(), 'pointsEarned': pointsEarned},
      where: 'id = ?',
      whereArgs: [sessionId],
    );
    await _bumpStreakAndPoints(pointsEarned);
  }

  Future<void> _bumpStreakAndPoints(int pointsEarned) async {
    final profile = await getProfile();
    final today = DateTime.now();
    final todayDate = DateTime(today.year, today.month, today.day);
    int newStreak = profile.streakDays;
    if (profile.lastWorkoutDate == null) {
      newStreak = 1;
    } else {
      final last = profile.lastWorkoutDate!;
      final lastDate = DateTime(last.year, last.month, last.day);
      final diff = todayDate.difference(lastDate).inDays;
      if (diff == 0) {
        // já treinou hoje, mantém streak
      } else if (diff == 1) {
        newStreak = profile.streakDays + 1;
      } else {
        newStreak = 1;
      }
    }
    await saveProfile(profile.copyWith(
      streakDays: newStreak,
      lastWorkoutDate: todayDate,
      totalPoints: profile.totalPoints + pointsEarned,
    ));
  }

  Future<List<WorkoutSession>> recentSessions({int limit = 20}) async {
    final db = await database;
    final rows = await db.query(
      'workout_sessions',
      where: 'finishedAt IS NOT NULL',
      orderBy: 'finishedAt DESC',
      limit: limit,
    );
    return rows.map(WorkoutSession.fromMap).toList();
  }

  Future<int> monthlySessionCount() async {
    final db = await database;
    final now = DateTime.now();
    final firstOfMonth = DateTime(now.year, now.month, 1);
    final rows = await db.query(
      'workout_sessions',
      where: 'finishedAt IS NOT NULL AND finishedAt >= ?',
      whereArgs: [firstOfMonth.toIso8601String()],
    );
    return rows.length;
  }

  /// Volume total (kg levantado) por dia dos últimos 7 dias, para o gráfico
  /// de evolução semanal.
  Future<Map<DateTime, double>> weeklyVolume() async {
    final db = await database;
    final now = DateTime.now();
    final start = DateTime(now.year, now.month, now.day).subtract(const Duration(days: 6));
    final rows = await db.query('set_logs', where: 'completedAt >= ?', whereArgs: [start.toIso8601String()]);
    final map = <DateTime, double>{};
    for (var i = 0; i < 7; i++) {
      map[start.add(Duration(days: i))] = 0;
    }
    for (final r in rows) {
      final log = SetLog.fromMap(r);
      final day = DateTime(log.completedAt.year, log.completedAt.month, log.completedAt.day);
      map[day] = (map[day] ?? 0.0) + log.volumeKg;
    }
    return map;
  }

  // -------------------------------------------------------------- Séries

  Future<int> addSetLog(SetLog log) async {
    final db = await database;
    return db.insert('set_logs', log.toMap()..remove('id'));
  }

  Future<List<SetLog>> setLogsForSession(int sessionId) async {
    final db = await database;
    final rows = await db.query('set_logs', where: 'sessionId = ?', whereArgs: [sessionId], orderBy: 'id ASC');
    return rows.map(SetLog.fromMap).toList();
  }

  /// Histórico de cargas de um exercício, do mais recente para o mais antigo
  /// — usado para calcular progressão de carga e recorde pessoal (PR/1RM).
  Future<List<SetLog>> setLogsForExercise(String exerciseId, {int limit = 200}) async {
    final db = await database;
    final rows = await db.query(
      'set_logs',
      where: 'exerciseId = ?',
      whereArgs: [exerciseId],
      orderBy: 'completedAt DESC',
      limit: limit,
    );
    return rows.map(SetLog.fromMap).toList();
  }

  Future<SetLog?> lastSetLogForExercise(String exerciseId) async {
    final list = await setLogsForExercise(exerciseId, limit: 1);
    return list.isEmpty ? null : list.first;
  }

  // ---------------------------------------------------------- Equipamentos

  Future<int> addEquipment(EquipmentEntry entry) async {
    final db = await database;
    return db.insert('equipment_log', entry.toMap()..remove('id'));
  }

  Future<List<EquipmentEntry>> equipmentLog() async {
    final db = await database;
    final rows = await db.query('equipment_log', orderBy: 'scannedAt DESC');
    return rows.map(EquipmentEntry.fromMap).toList();
  }
}
