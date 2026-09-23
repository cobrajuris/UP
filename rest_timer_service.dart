import 'dart:async';
import 'package:flutter/foundation.dart';
import 'notification_service.dart';

/// Cronômetro de descanso entre séries — pedido explicitamente como "relógio
/// flutuante". É um ChangeNotifier global (ver main.dart) para continuar
/// contando e aparecer sobreposto em qualquer tela, mesmo trocando de
/// exercício, e disparar som mesmo com o app em segundo plano.
class RestTimerService extends ChangeNotifier {
  RestTimerService._();
  static final RestTimerService instance = RestTimerService._();

  Timer? _ticker;
  DateTime? _endsAt;
  int _totalSeconds = 0;
  String? _label;

  bool get isRunning => _endsAt != null;
  String? get label => _label;
  int get totalSeconds => _totalSeconds;

  int get remainingSeconds {
    if (_endsAt == null) return 0;
    final diff = _endsAt!.difference(DateTime.now()).inSeconds;
    return diff > 0 ? diff : 0;
  }

  double get progress {
    if (_totalSeconds == 0) return 0;
    final ratio = (remainingSeconds / _totalSeconds).clamp(0, 1).toDouble();
    return 1 - ratio;
  }

  void start(int seconds, {String? label}) {
    _ticker?.cancel();
    _totalSeconds = seconds;
    _label = label;
    _endsAt = DateTime.now().add(Duration(seconds: seconds));
    NotificationService.instance.scheduleRestEnd(seconds: seconds, exerciseName: label);
    _ticker = Timer.periodic(const Duration(seconds: 1), (_) {
      if (remainingSeconds <= 0) {
        stop(notifyDone: false);
      } else {
        notifyListeners();
      }
    });
    notifyListeners();
  }

  void addSeconds(int delta) {
    if (_endsAt == null) return;
    _endsAt = _endsAt!.add(Duration(seconds: delta));
    _totalSeconds += delta;
    notifyListeners();
  }

  void stop({bool notifyDone = true}) {
    _ticker?.cancel();
    _ticker = null;
    _endsAt = null;
    _totalSeconds = 0;
    _label = null;
    if (notifyDone) {
      NotificationService.instance.cancelRestEnd();
    }
    notifyListeners();
  }

  @override
  void dispose() {
    _ticker?.cancel();
    super.dispose();
  }
}
