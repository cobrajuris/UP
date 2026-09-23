import 'package:flutter/material.dart';
import '../data/exercise_repository.dart';
import '../models/models.dart';
import '../services/database_service.dart';
import '../services/training_calculators.dart';
import '../theme/tokens.dart';
import '../widgets/buttons.dart';
import '../widgets/data_widgets.dart';
import '../widgets/navigation_widgets.dart';
import '../widgets/surfaces.dart';
import 'active_workout_screen.dart';

/// Porta de ui_kits/uppro-app/Ficha.jsx (FichaScreen) — detalhe da ficha com
/// exercícios, última carga usada e histórico de evolução.
class FichaScreen extends StatefulWidget {
  const FichaScreen({super.key, required this.plan});
  final WorkoutPlan plan;

  @override
  State<FichaScreen> createState() => _FichaScreenState();
}

class _FichaScreenState extends State<FichaScreen> {
  late Future<_FichaData> _future;

  @override
  void initState() {
    super.initState();
    _future = _load();
  }

  Future<_FichaData> _load() async {
    final exercises = <Exercise>[];
    final lastLogs = <String, SetLog?>{};
    for (final pe in widget.plan.exercises) {
      final ex = await ExerciseRepository.instance.byId(pe.exerciseId);
      if (ex != null) {
        exercises.add(ex);
        lastLogs[ex.id] = await DatabaseService.instance.lastSetLogForExercise(ex.id);
      }
    }
    final sessions = await DatabaseService.instance.recentSessions(limit: 50);
    final planSessions = sessions.where((s) => s.planId == widget.plan.id).toList();
    String? loadEvolution;
    if (exercises.isNotEmpty) {
      final logs = await DatabaseService.instance.setLogsForExercise(exercises.first.id, limit: 100);
      if (logs.length >= 2) {
        final first1Rm = TrainingCalculators.epley1Rm(weightKg: logs.last.weightKg, reps: logs.last.reps);
        final last1Rm = TrainingCalculators.epley1Rm(weightKg: logs.first.weightKg, reps: logs.first.reps);
        final delta = last1Rm - first1Rm;
        if (delta.abs() >= 0.5) {
          loadEvolution = '${delta >= 0 ? '+' : ''}${delta.round()} kg no ${exercises.first.name.toLowerCase()} desde o início';
        }
      }
    }
    return _FichaData(exercises: exercises, lastLogs: lastLogs, sessionCount: planSessions.length, loadEvolution: loadEvolution);
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<_FichaData>(
      future: _future,
      builder: (context, snap) {
        if (!snap.hasData) return const Scaffold(backgroundColor: AppColors.black, body: Center(child: CircularProgressIndicator(color: AppColors.lime300)));
        final d = snap.data!;
        return Scaffold(
          backgroundColor: AppColors.black,
          body: UpScreenScaffold(
            header: UpScreenHeader(
              left: UpIconButton(tone: UpIconButtonTone.lime, icon: const Icon(Icons.chevron_left), onPressed: () => Navigator.of(context).maybePop()),
              title: '${widget.plan.name} · ${widget.plan.focus}',
            ),
            footer: UpButton(
              block: true,
              onPressed: () async {
                await Navigator.of(context).push(MaterialPageRoute(builder: (_) => ActiveWorkoutScreen(plan: widget.plan, exercises: d.exercises)));
                setState(() => _future = _load());
              },
              child: const Text('Iniciar treino'),
            ),
            body: [
              Column(
                children: [
                  Container(
                    width: 96, height: 96,
                    decoration: BoxDecoration(gradient: AppColors.gradSurface, borderRadius: BorderRadius.circular(AppRadius.xl), boxShadow: AppGlow.hairline),
                    alignment: Alignment.center,
                    child: const Icon(Icons.fitness_center, color: AppColors.lime300, size: 34),
                  ),
                  const SizedBox(height: 10),
                  Text(widget.plan.focus, style: AppText.title3.copyWith(color: AppColors.white, fontWeight: FontWeight.w700)),
                  const SizedBox(height: 6),
                  Text('Treino montado a partir do seu quiz. Atualiza a cada 4 semanas.',
                      textAlign: TextAlign.center, style: AppText.bodySm.copyWith(color: Colors.white.withOpacity(0.7))),
                ],
              ),
              Row(
                children: [
                  Expanded(child: UpChip(label: '${widget.plan.estimatedMinutes} MIN', tone: UpChipTone.outline)),
                  const SizedBox(width: 8),
                  Expanded(child: UpChip(label: '${d.exercises.length} EXERC.', tone: UpChipTone.outline)),
                  const SizedBox(width: 8),
                  Expanded(child: UpChip(label: '${d.sessionCount}x FEITO', tone: UpChipTone.outline)),
                ],
              ),
              const UpSectionTitle('Exercícios'),
              ...d.exercises.map((e) {
                final last = d.lastLogs[e.id];
                final subtitle = last == null
                    ? '${e.defaultSets}x${e.repsRange}'
                    : '${e.defaultSets}x${e.repsRange} · ${last.weightKg.toStringAsFixed(last.weightKg.truncateToDouble() == last.weightKg ? 0 : 1)} kg';
                return Padding(
                  padding: const EdgeInsets.only(bottom: AppSpacing.gapRow),
                  child: UpListRow(icon: const Icon(Icons.fitness_center), title: e.name, subtitle: subtitle),
                );
              }),
              const UpSectionTitle('Histórico'),
              UpListRow(icon: const Icon(Icons.history), title: 'Últimas execuções', subtitle: '${d.sessionCount} treinos nesta ficha', chevron: false),
              const SizedBox(height: AppSpacing.gapRow),
              UpListRow(
                icon: const Icon(Icons.show_chart),
                title: 'Evolução de carga',
                subtitle: d.loadEvolution ?? 'Registre séries para ver sua evolução aqui',
                chevron: false,
              ),
            ],
          ),
        );
      },
    );
  }
}

class _FichaData {
  _FichaData({required this.exercises, required this.lastLogs, required this.sessionCount, this.loadEvolution});
  final List<Exercise> exercises;
  final Map<String, SetLog?> lastLogs;
  final int sessionCount;
  final String? loadEvolution;
}
