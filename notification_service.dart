import 'dart:io';
import 'package:flutter_local_notifications/flutter_local_notifications.dart';
import 'package:timezone/data/latest_all.dart' as tzdata;
import 'package:timezone/timezone.dart' as tz;

/// Notificações locais do UP.PRO — não depende de servidor push (isso fica
/// para a Fase 2/Firebase Cloud Messaging, ver ROADMAP.md). Cobre:
/// 1) o aviso sonoro de fim do descanso entre séries;
/// 2) o lembrete fixo de dias de treino (Seg/Qua/Sex etc.).
class NotificationService {
  NotificationService._();
  static final NotificationService instance = NotificationService._();

  final _plugin = FlutterLocalNotificationsPlugin();
  bool _ready = false;

  static const _restChannel = AndroidNotificationDetails(
    'uppro_rest_timer',
    'Cronômetro de descanso',
    channelDescription: 'Avisa quando o descanso entre séries termina',
    importance: Importance.max,
    priority: Priority.high,
    playSound: true,
    enableVibration: true,
  );

  static const _reminderChannel = AndroidNotificationDetails(
    'uppro_reminders',
    'Lembretes de treino',
    channelDescription: 'Lembra você nos dias de treino configurados',
    importance: Importance.defaultImportance,
    priority: Priority.defaultPriority,
  );

  Future<void> init() async {
    if (_ready) return;
    tzdata.initializeTimeZones();
    const androidInit = AndroidInitializationSettings('@mipmap/ic_launcher');
    const iosInit = DarwinInitializationSettings();
    await _plugin.initialize(
      const InitializationSettings(android: androidInit, iOS: iosInit),
    );
    if (Platform.isAndroid) {
      final androidImpl = _plugin.resolvePlatformSpecificImplementation<AndroidFlutterLocalNotificationsPlugin>();
      await androidImpl?.requestNotificationsPermission();
      await androidImpl?.requestExactAlarmsPermission();
    }
    _ready = true;
  }

  /// Agenda o aviso sonoro para daqui a [seconds] segundos — usado pelo
  /// RestTimerService a cada descanso entre séries. Dispara mesmo com o
  /// app em segundo plano.
  Future<void> scheduleRestEnd({required int seconds, String? exerciseName}) async {
    await init();
    await _plugin.cancel(9001);
    final when = tz.TZDateTime.now(tz.local).add(Duration(seconds: seconds));
    await _plugin.zonedSchedule(
      9001,
      'Descanso acabou 💪',
      exerciseName == null ? 'Hora da próxima série.' : 'Hora da próxima série de $exerciseName.',
      when,
      const NotificationDetails(android: _restChannel, iOS: DarwinNotificationDetails()),
      androidScheduleMode: AndroidScheduleMode.exactAllowWhileIdle,
    );
  }

  Future<void> cancelRestEnd() async {
    await _plugin.cancel(9001);
  }

  /// Lembretes recorrentes de treino em dias/horário fixos, ex.: Seg, Qua,
  /// Sex às 19h (visto na tela de Perfil do design). weekdays usa a
  /// convenção do Dart: segunda = 1 ... domingo = 7.
  Future<void> setWeeklyReminders({required List<int> weekdays, required int hour, required int minute}) async {
    await init();
    for (var i = 0; i < 7; i++) {
      await _plugin.cancel(9100 + i);
    }
    for (final weekday in weekdays) {
      final id = 9100 + weekday;
      final when = _nextInstanceOfWeekday(weekday, hour, minute);
      await _plugin.zonedSchedule(
        id,
        'Bora treinar? 🔥',
        'Hoje é dia de treino no seu plano UP.PRO.',
        when,
        const NotificationDetails(android: _reminderChannel, iOS: DarwinNotificationDetails()),
        androidScheduleMode: AndroidScheduleMode.exactAllowWhileIdle,
        matchDateTimeComponents: DateTimeComponents.dayOfWeekAndTime,
      );
    }
  }

  Future<void> cancelWeeklyReminders() async {
    for (var i = 0; i < 8; i++) {
      await _plugin.cancel(9100 + i);
    }
  }

  tz.TZDateTime _nextInstanceOfWeekday(int weekday, int hour, int minute) {
    var scheduled = tz.TZDateTime.now(tz.local);
    scheduled = tz.TZDateTime(tz.local, scheduled.year, scheduled.month, scheduled.day, hour, minute);
    while (scheduled.weekday != weekday || scheduled.isBefore(tz.TZDateTime.now(tz.local))) {
      scheduled = scheduled.add(const Duration(days: 1));
    }
    return scheduled;
  }
}
