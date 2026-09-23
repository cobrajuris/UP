// Modelos de dados do UP.PRO.
// Exercise/WorkoutPlan vêm dos JSONs em assets/data (catálogo fixo, sem editor).
// SetLog/WorkoutSession/UserProfile são persistidos localmente via sqflite
// (lib/services/database_service.dart) — o histórico não se perde ao fechar o app.

class Exercise {
  const Exercise({
    required this.id,
    required this.name,
    required this.muscleGroup,
    required this.equipment,
    required this.difficulty,
    required this.instructions,
    this.variations = const [],
    this.imageQuery,
    this.defaultSets = 3,
    this.defaultRepsMin = 8,
    this.defaultRepsMax = 12,
    this.defaultRestSeconds = 60,
  });

  final String id;
  final String name;
  final String muscleGroup;
  final String equipment;
  final String difficulty; // iniciante | intermediario | avancado
  final String instructions;
  final List<String> variations;
  final String? imageQuery;
  final int defaultSets;
  final int defaultRepsMin;
  final int defaultRepsMax;
  final int defaultRestSeconds;

  String get repsRange => defaultRepsMin == defaultRepsMax ? '$defaultRepsMin' : '$defaultRepsMin-$defaultRepsMax';

  factory Exercise.fromJson(Map<String, dynamic> j) => Exercise(
        id: j['id'] as String,
        name: j['name'] as String,
        muscleGroup: j['muscleGroup'] as String,
        equipment: j['equipment'] as String,
        difficulty: j['difficulty'] as String,
        instructions: j['instructions'] as String,
        variations: (j['variations'] as List<dynamic>? ?? []).cast<String>(),
        imageQuery: j['imageQuery'] as String?,
        defaultSets: j['defaultSets'] as int? ?? 3,
        defaultRepsMin: j['defaultRepsMin'] as int? ?? 8,
        defaultRepsMax: j['defaultRepsMax'] as int? ?? 12,
        defaultRestSeconds: j['defaultRestSeconds'] as int? ?? 60,
      );
}

class PlanExercise {
  const PlanExercise({
    required this.exerciseId,
    this.sets,
    this.repsMin,
    this.repsMax,
    this.restSeconds,
  });

  final String exerciseId;
  final int? sets;
  final int? repsMin;
  final int? repsMax;
  final int? restSeconds;

  factory PlanExercise.fromJson(Map<String, dynamic> j) => PlanExercise(
        exerciseId: j['exerciseId'] as String,
        sets: j['sets'] as int?,
        repsMin: j['repsMin'] as int?,
        repsMax: j['repsMax'] as int?,
        restSeconds: j['restSeconds'] as int?,
      );
}

class WorkoutPlan {
  const WorkoutPlan({
    required this.id,
    required this.name,
    required this.focus,
    required this.split,
    required this.goal,
    required this.level,
    required this.estimatedMinutes,
    required this.exercises,
  });

  final String id; // 'A', 'B', 'C'...
  final String name; // 'Ficha A'
  final String focus; // 'Peito e Tríceps'
  final String split; // abc | ppl | upper_lower | full_body
  final String goal; // emagrecer | hipertrofia | saude
  final String level; // iniciante | retomando | avancado
  final int estimatedMinutes;
  final List<PlanExercise> exercises;

  factory WorkoutPlan.fromJson(Map<String, dynamic> j) => WorkoutPlan(
        id: j['id'] as String,
        name: j['name'] as String,
        focus: j['focus'] as String,
        split: j['split'] as String,
        goal: j['goal'] as String,
        level: j['level'] as String,
        estimatedMinutes: j['estimatedMinutes'] as int,
        exercises: (j['exercises'] as List<dynamic>)
            .map((e) => PlanExercise.fromJson(e as Map<String, dynamic>))
            .toList(),
      );
}

class SetLog {
  const SetLog({
    this.id,
    required this.sessionId,
    required this.exerciseId,
    required this.exerciseName,
    required this.setIndex,
    required this.reps,
    required this.weightKg,
    required this.completedAt,
  });

  final int? id;
  final int sessionId;
  final String exerciseId;
  final String exerciseName;
  final int setIndex;
  final int reps;
  final double weightKg;
  final DateTime completedAt;

  double get volumeKg => reps * weightKg;

  /// 1RM estimado pela fórmula de Epley: peso × (1 + reps/30)
  double get estimated1Rm => weightKg * (1 + reps / 30);

  Map<String, dynamic> toMap() => {
        'id': id,
        'sessionId': sessionId,
        'exerciseId': exerciseId,
        'exerciseName': exerciseName,
        'setIndex': setIndex,
        'reps': reps,
        'weightKg': weightKg,
        'completedAt': completedAt.toIso8601String(),
      };

  factory SetLog.fromMap(Map<String, dynamic> m) => SetLog(
        id: m['id'] as int?,
        sessionId: m['sessionId'] as int,
        exerciseId: m['exerciseId'] as String,
        exerciseName: m['exerciseName'] as String,
        setIndex: m['setIndex'] as int,
        reps: m['reps'] as int,
        weightKg: (m['weightKg'] as num).toDouble(),
        completedAt: DateTime.parse(m['completedAt'] as String),
      );
}

class WorkoutSession {
  const WorkoutSession({
    this.id,
    required this.planId,
    required this.planName,
    required this.startedAt,
    this.finishedAt,
    this.pointsEarned = 0,
  });

  final int? id;
  final String planId;
  final String planName;
  final DateTime startedAt;
  final DateTime? finishedAt;
  final int pointsEarned;

  int get durationMinutes {
    if (finishedAt == null) return 0;
    return finishedAt!.difference(startedAt).inMinutes;
  }

  Map<String, dynamic> toMap() => {
        'id': id,
        'planId': planId,
        'planName': planName,
        'startedAt': startedAt.toIso8601String(),
        'finishedAt': finishedAt?.toIso8601String(),
        'pointsEarned': pointsEarned,
      };

  factory WorkoutSession.fromMap(Map<String, dynamic> m) => WorkoutSession(
        id: m['id'] as int?,
        planId: m['planId'] as String,
        planName: m['planName'] as String,
        startedAt: DateTime.parse(m['startedAt'] as String),
        finishedAt: m['finishedAt'] == null ? null : DateTime.parse(m['finishedAt'] as String),
        pointsEarned: m['pointsEarned'] as int? ?? 0,
      );

  WorkoutSession copyWith({DateTime? finishedAt, int? pointsEarned}) => WorkoutSession(
        id: id,
        planId: planId,
        planName: planName,
        startedAt: startedAt,
        finishedAt: finishedAt ?? this.finishedAt,
        pointsEarned: pointsEarned ?? this.pointsEarned,
      );
}

class UserProfile {
  const UserProfile({
    this.name = '',
    this.heightCm,
    this.weightKg,
    this.goal = 'hipertrofia',
    this.level = 'iniciante',
    this.streakDays = 0,
    this.lastWorkoutDate,
    this.totalPoints = 0,
    this.onboardingDone = false,
  });

  final String name;
  final double? heightCm;
  final double? weightKg;
  final String goal;
  final String level;
  final int streakDays;
  final DateTime? lastWorkoutDate;
  final int totalPoints;
  final bool onboardingDone;

  double? get bmi {
    if (heightCm == null || weightKg == null || heightCm == 0) return null;
    final h = heightCm! / 100;
    return weightKg! / (h * h);
  }

  int get gamificationLevel => 1 + (totalPoints ~/ 500);

  Map<String, dynamic> toMap() => {
        'name': name,
        'heightCm': heightCm,
        'weightKg': weightKg,
        'goal': goal,
        'level': level,
        'streakDays': streakDays,
        'lastWorkoutDate': lastWorkoutDate?.toIso8601String(),
        'totalPoints': totalPoints,
        'onboardingDone': onboardingDone ? 1 : 0,
      };

  factory UserProfile.fromMap(Map<String, dynamic> m) => UserProfile(
        name: m['name'] as String? ?? '',
        heightCm: (m['heightCm'] as num?)?.toDouble(),
        weightKg: (m['weightKg'] as num?)?.toDouble(),
        goal: m['goal'] as String? ?? 'hipertrofia',
        level: m['level'] as String? ?? 'iniciante',
        streakDays: m['streakDays'] as int? ?? 0,
        lastWorkoutDate: m['lastWorkoutDate'] == null ? null : DateTime.parse(m['lastWorkoutDate'] as String),
        totalPoints: m['totalPoints'] as int? ?? 0,
        onboardingDone: (m['onboardingDone'] as int? ?? 0) == 1,
      );

  UserProfile copyWith({
    String? name,
    double? heightCm,
    double? weightKg,
    String? goal,
    String? level,
    int? streakDays,
    DateTime? lastWorkoutDate,
    int? totalPoints,
    bool? onboardingDone,
  }) =>
      UserProfile(
        name: name ?? this.name,
        heightCm: heightCm ?? this.heightCm,
        weightKg: weightKg ?? this.weightKg,
        goal: goal ?? this.goal,
        level: level ?? this.level,
        streakDays: streakDays ?? this.streakDays,
        lastWorkoutDate: lastWorkoutDate ?? this.lastWorkoutDate,
        totalPoints: totalPoints ?? this.totalPoints,
        onboardingDone: onboardingDone ?? this.onboardingDone,
      );
}

class EquipmentEntry {
  const EquipmentEntry({
    this.id,
    required this.name,
    required this.muscleGroup,
    required this.description,
    this.photoPath,
    required this.scannedAt,
  });

  final int? id;
  final String name;
  final String muscleGroup;
  final String description;
  final String? photoPath;
  final DateTime scannedAt;

  Map<String, dynamic> toMap() => {
        'id': id,
        'name': name,
        'muscleGroup': muscleGroup,
        'description': description,
        'photoPath': photoPath,
        'scannedAt': scannedAt.toIso8601String(),
      };

  factory EquipmentEntry.fromMap(Map<String, dynamic> m) => EquipmentEntry(
        id: m['id'] as int?,
        name: m['name'] as String,
        muscleGroup: m['muscleGroup'] as String,
        description: m['description'] as String,
        photoPath: m['photoPath'] as String?,
        scannedAt: DateTime.parse(m['scannedAt'] as String),
      );
}
