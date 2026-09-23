import 'package:flutter/material.dart';
import '../models/models.dart';
import '../services/database_service.dart';
import '../services/rest_timer_service.dart';
import '../services/training_calculators.dart';
import '../theme/tokens.dart';
import '../widgets/buttons.dart';
import '../widgets/data_widgets.dart';
import '../widgets/surfaces.dart';
import 'checkin_celebrate_screens.dart';

/// Tela de execução do treino: registra série a série (reps + carga),
/// dispara o cronômetro de descanso entre séries e, ao final, fecha a
/// sessão e manda para a tela de celebração. É o núcleo funcional pedido
/// ("sistema de séries/repetições/carga com progressão ao longo do tempo").
class ActiveWorkoutScreen extends StatefulWidget {
  const ActiveWorkoutScreen({super.key, required this.plan, required this.exercises});
  final WorkoutPlan plan;
  final List<Exercise> exercises;

  @override
  State<ActiveWorkoutScreen> createState() => _ActiveWorkoutScreenState();
}

enum _Phase { logging, resting }

class _ActiveWorkoutScreenState extends State<ActiveWorkoutScreen> {
  int _exerciseIndex = 0;
  int _setIndex = 0; // 0-based dentro do exercício atual
  _Phase _phase = _Phase.logging;
  int? _sessionId;
  double _totalVolume = 0;
  bool _finishing = false;
  bool _restAdvancing = false;

  late final TextEditingController _repsCtrl;
  late final TextEditingController _weightCtrl;
  final DateTime _startedAt = DateTime.now();

  Exercise get _exercise => widget.exercises[_exerciseIndex];
  int get _totalSetsForExercise => _exercise.defaultSets;

  @override
  void initState() {
    super.initState();
    _repsCtrl = TextEditingController(text: _exercise.defaultRepsMax.toString());
    _weightCtrl = TextEditingController();
    _startSession();
    _prefillWeight();
  }

  Future<void> _startSession() async {
    final id = await DatabaseService.instance.startSession(planId: widget.plan.id, planName: widget.plan.name);
    if (mounted) setState(() => _sessionId = id);
  }

  Future<void> _prefillWeight() async {
    final last = await DatabaseService.instance.lastSetLogForExercise(_exercise.id);
    if (mounted && last != null) {
      setState(() => _weightCtrl.text = _fmt(last.weightKg));
    }
  }

  String _fmt(double v) => v.truncateToDouble() == v ? v.toStringAsFixed(0) : v.toStringAsFixed(1);

  Future<void> _completeSet() async {
    if (_sessionId == null) return;
    final reps = int.tryParse(_repsCtrl.text) ?? _exercise.defaultRepsMax;
    final weight = double.tryParse(_weightCtrl.text.replaceAll(',', '.')) ?? 0.0;
    final log = SetLog(
      sessionId: _sessionId!,
      exerciseId: _exercise.id,
      exerciseName: _exercise.name,
      setIndex: _setIndex + 1,
      reps: reps,
      weightKg: weight,
      completedAt: DateTime.now(),
    );
    await DatabaseService.instance.addSetLog(log);
    _totalVolume += log.volumeKg;

    final isLastSet = _setIndex + 1 >= _totalSetsForExercise;
    final isLastExercise = _exerciseIndex + 1 >= widget.exercises.length;

    if (isLastSet && isLastExercise) {
      await _finishWorkout();
      return;
    }

    setState(() => _phase = _Phase.resting);
    RestTimerService.instance.start(_exercise.defaultRestSeconds, label: _exercise.name);
  }

  void _advanceAfterRest() {
    if (!mounted) return;
    final isLastSet = _setIndex + 1 >= _totalSetsForExercise;
    setState(() {
      _restAdvancing = false;
      if (isLastSet) {
        _exerciseIndex += 1;
        _setIndex = 0;
        _repsCtrl.text = _exercise.defaultRepsMax.toString();
        _weightCtrl.clear();
        _prefillWeight();
      } else {
        _setIndex += 1;
      }
      _phase = _Phase.logging;
    });
  }

  Future<void> _finishWorkout() async {
    if (_sessionId == null || _finishing) return;
    setState(() => _finishing = true);
    final minutes = DateTime.now().difference(_startedAt).inMinutes.clamp(1, 600).toInt();
    final points = TrainingCalculators.pointsForSession(totalVolumeKg: _totalVolume, minutes: minutes);
    await DatabaseService.instance.finishSession(_sessionId!, pointsEarned: points);
    RestTimerService.instance.stop();
    if (!mounted) return;
    Navigator.of(context).pushReplacement(MaterialPageRoute(
      builder: (_) => CelebrateScreen(
        planName: widget.plan.name,
        minutes: minutes,
        points: points,
        totalExercises: widget.exercises.length,
      ),
    ));
  }

  Future<bool> _confirmExit() async {
    final result = await showDialog<bool>(
      context: context,
      builder: (_) => AlertDialog(
        backgroundColor: AppColors.surface1,
        title: const Text('Sair do treino?', style: TextStyle(color: AppColors.white)),
        content: const Text('As séries já registradas ficam salvas no histórico.', style: TextStyle(color: AppColors.textSecondary)),
        actions: [
          TextButton(onPressed: () => Navigator.of(context).pop(false), child: const Text('Continuar treino')),
          TextButton(onPressed: () => Navigator.of(context).pop(true), child: const Text('Sair')),
        ],
      ),
    );
    return result ?? false;
  }

  @override
  void dispose() {
    _repsCtrl.dispose();
    _weightCtrl.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return PopScope(
      canPop: false,
      onPopInvokedWithResult: (didPop, _) async {
        if (didPop) return;
        if (await _confirmExit() && mounted) Navigator.of(context).pop();
      },
      child: Scaffold(
        backgroundColor: AppColors.black,
        body: SafeArea(
          child: _phase == _Phase.resting ? _buildResting() : _buildLogging(),
        ),
      ),
    );
  }

  Widget _buildLogging() {
    return Padding(
      padding: const EdgeInsets.fromLTRB(AppSpacing.gutterScreen, 16, AppSpacing.gutterScreen, 24),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Row(
            children: [
              IconButton(
                icon: const Icon(Icons.close, color: AppColors.textMuted),
                onPressed: () async {
                  if (await _confirmExit() && mounted) Navigator.of(context).pop();
                },
              ),
              Expanded(
                child: Text(
                  'Exercício ${_exerciseIndex + 1} de ${widget.exercises.length}',
                  textAlign: TextAlign.center,
                  style: AppText.bodySm.copyWith(color: AppColors.textMuted),
                ),
              ),
              const SizedBox(width: 48),
            ],
          ),
          const SizedBox(height: 12),
          UpProgressBar(value: ((_exerciseIndex) / widget.exercises.length) * 100, height: 4, knob: true),
          const SizedBox(height: 24),
          Text(_exercise.name, textAlign: TextAlign.center, style: AppText.title1.copyWith(color: AppColors.white)),
          const SizedBox(height: 6),
          Text('${_exercise.muscleGroup} · ${_exercise.equipment}', textAlign: TextAlign.center, style: AppText.bodySm.copyWith(color: AppColors.textMuted)),
          const SizedBox(height: 16),
          UpCard(
            radius: AppRadius.lg,
            child: Text(_exercise.instructions, style: AppText.bodySm.copyWith(color: AppColors.textSecondary, height: 1.5)),
          ),
          const SizedBox(height: 20),
          Text('Série ${_setIndex + 1} de $_totalSetsForExercise', textAlign: TextAlign.center, style: AppText.title3.copyWith(color: AppColors.lime300, fontWeight: FontWeight.w700)),
          const SizedBox(height: 16),
          Row(
            children: [
              Expanded(child: _NumberField(label: 'Repetições', controller: _repsCtrl)),
              const SizedBox(width: 12),
              Expanded(child: _NumberField(label: 'Carga (kg)', controller: _weightCtrl, allowDecimal: true)),
            ],
          ),
          const Spacer(),
          UpButton(block: true, onPressed: _completeSet, child: const Text('Concluir série')),
        ],
      ),
    );
  }

  Widget _buildResting() {
    return AnimatedBuilder(
      animation: RestTimerService.instance,
      builder: (context, _) {
        final timer = RestTimerService.instance;
        if (!timer.isRunning && !_restAdvancing) {
          _restAdvancing = true;
          WidgetsBinding.instance.addPostFrameCallback((_) => _advanceAfterRest());
        }
        final m = (timer.remainingSeconds ~/ 60).toString().padLeft(2, '0');
        final s = (timer.remainingSeconds % 60).toString().padLeft(2, '0');
        return Padding(
          padding: const EdgeInsets.all(AppSpacing.gutterScreen),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text('Descanso', style: AppText.title2.copyWith(color: AppColors.white)),
              const SizedBox(height: 8),
              Text(_exercise.name, style: AppText.bodySm.copyWith(color: AppColors.textMuted)),
              const SizedBox(height: 32),
              UpProgressRing(
                value: timer.progress * 100,
                size: 220,
                thickness: 14,
                child: Text('$m:$s', style: AppText.display2.copyWith(color: AppColors.white, fontWeight: FontWeight.w800)),
              ),
              const SizedBox(height: 32),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  TextButton(onPressed: () => RestTimerService.instance.addSeconds(15), child: const Text('+15s')),
                  const SizedBox(width: 16),
                  UpButton(
                    variant: UpButtonVariant.outline,
                    size: UpButtonSize.md,
                    onPressed: () => RestTimerService.instance.stop(),
                    child: const Text('Pular descanso'),
                  ),
                ],
              ),
            ],
          ),
        );
      },
    );
  }
}

class _NumberField extends StatelessWidget {
  const _NumberField({required this.label, required this.controller, this.allowDecimal = false});
  final String label;
  final TextEditingController controller;
  final bool allowDecimal;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(label, style: AppText.label.copyWith(color: AppColors.textMuted)),
        const SizedBox(height: 6),
        TextField(
          controller: controller,
          keyboardType: TextInputType.numberWithOptions(decimal: allowDecimal),
          style: AppText.title2.copyWith(color: AppColors.white),
          textAlign: TextAlign.center,
          decoration: InputDecoration(
            filled: true,
            fillColor: AppColors.surface2,
            contentPadding: const EdgeInsets.symmetric(vertical: 12),
            border: OutlineInputBorder(borderRadius: BorderRadius.circular(AppRadius.md), borderSide: BorderSide.none),
          ),
        ),
      ],
    );
  }
}
