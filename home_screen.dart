import 'package:flutter/material.dart';
import '../data/exercise_repository.dart';
import '../data/workout_plan_repository.dart';
import '../models/models.dart';
import '../services/database_service.dart';
import '../services/training_calculators.dart';
import '../theme/tokens.dart';
import '../widgets/buttons.dart';
import '../widgets/data_widgets.dart';
import '../widgets/navigation_widgets.dart';
import '../widgets/surfaces.dart';
import 'ficha_screen.dart';
import 'scan_screen.dart';
import 'checkin_celebrate_screens.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  String _range = 'Hoje';
  late Future<_HomeData> _future;

  @override
  void initState() {
    super.initState();
    _future = _load();
  }

  void _reload() => setState(() => _future = _load());

  Future<_HomeData> _load() async {
    final profile = await DatabaseService.instance.getProfile();
    final planIds = await DatabaseService.instance.getSelectedPlanIds();
    final allPlans = await WorkoutPlanRepository.instance.all();
    final plans = planIds.map((id) => allPlans.where((p) => p.id == id)).where((it) => it.isNotEmpty).map((it) => it.first).toList();
    WorkoutPlan? todayPlan;
    var doneToday = 0;
    if (plans.isNotEmpty) {
      final dayIndex = DateTime.now().difference(DateTime(2024, 1, 1)).inDays % plans.length;
      todayPlan = plans[dayIndex];
      final today = DateTime.now();
      final start = DateTime(today.year, today.month, today.day);
      final logs = <SetLog>[];
      for (final ex in todayPlan.exercises) {
        final l = await DatabaseService.instance.setLogsForExercise(ex.exerciseId, limit: 5);
        logs.addAll(l.where((x) => x.completedAt.isAfter(start)));
      }
      doneToday = logs.map((l) => l.exerciseId).toSet().length;
    }
    final sessions = await DatabaseService.instance.recentSessions(limit: 30);
    final today = DateTime.now();
    final todaysSessions = sessions.where((s) =>
        s.finishedAt != null &&
        s.finishedAt!.year == today.year &&
        s.finishedAt!.month == today.month &&
        s.finishedAt!.day == today.day);
    final minutesToday = todaysSessions.fold<int>(0, (a, s) => a + s.durationMinutes);
    final kcalToday = TrainingCalculators.estimateCalories(minutes: minutesToday, bodyWeightKg: profile.weightKg ?? 75);
    final weekly = await DatabaseService.instance.weeklyVolume();
    final muscleGroups = await ExerciseRepository.instance.muscleGroups();

    return _HomeData(
      profile: profile,
      plans: plans,
      todayPlan: todayPlan,
      doneToday: doneToday,
      minutesToday: minutesToday,
      kcalToday: kcalToday,
      weeklyVolume: weekly,
      muscleGroups: muscleGroups.take(4).toList(),
    );
  }

  Future<void> _openMuscleGroup(String group) async {
    final exercises = await ExerciseRepository.instance.byMuscleGroup(group);
    if (!mounted) return;
    showModalBottomSheet(
      context: context,
      backgroundColor: AppColors.surface1,
      shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(AppRadius.xl))),
      builder: (_) => SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(AppSpacing.gutterScreen),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              UpSectionTitle(group),
              const SizedBox(height: 8),
              Flexible(
                child: ListView.separated(
                  shrinkWrap: true,
                  itemCount: exercises.length,
                  separatorBuilder: (_, __) => const SizedBox(height: AppSpacing.gapRow),
                  itemBuilder: (_, i) {
                    final e = exercises[i];
                    return UpListRow(
                      icon: const Icon(Icons.fitness_center),
                      title: e.name,
                      subtitle: '${e.defaultSets}x${e.repsRange} · ${e.equipment}',
                      chevron: false,
                    );
                  },
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<_HomeData>(
      future: _future,
      builder: (context, snap) {
        if (!snap.hasData) {
          return const Center(child: CircularProgressIndicator(color: AppColors.lime300));
        }
        final d = snap.data!;
        return UpScreenScaffold(
          header: UpScreenHeader(
            alignStart: true,
            title: 'Olá, ${d.profile.name.isEmpty ? 'atleta' : d.profile.name}',
            subtitle: 'Nível ${d.profile.gamificationLevel} · Constância',
            right: const UpIconButton(tone: UpIconButtonTone.lime, icon: Icon(Icons.notifications), badge: true),
          ),
          body: [
            UpSegmentedControl(
              options: const ['Hoje', 'Fichas', 'Semana'],
              value: _range,
              onChanged: (v) => setState(() => _range = v),
            ),
            if (_range == 'Semana')
              UpCard(
                radius: AppRadius.xl,
                child: UpBarChart(
                  height: 160,
                  data: d.weeklyVolume.entries
                      .map((e) => UpBarChartPoint(
                            label: _weekdayLabel(e.key.weekday),
                            value: e.value,
                            active: e.value > 0,
                          ))
                      .toList(),
                ),
              )
            else
              UpCard(
                radius: AppRadius.xl,
                child: Column(
                  children: [
                    UpProgressRing(
                      value: d.todayPlan == null ? 0.0 : (d.doneToday / d.todayPlan!.exercises.length) * 100,
                      size: 172,
                      thickness: 13,
                      child: Column(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          Text(d.todayPlan?.name ?? '—', style: AppText.caption.copyWith(color: AppColors.textMuted)),
                          Text('${d.doneToday}/${d.todayPlan?.exercises.length ?? 0}', style: AppText.metric.copyWith(color: AppColors.white, fontWeight: FontWeight.w800)),
                          Text('exercícios', style: AppText.caption.copyWith(color: AppColors.textMuted)),
                        ],
                      ),
                    ),
                    const SizedBox(height: 14),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceAround,
                      children: [
                        UpStatTile(icon: const Icon(Icons.local_fire_department), value: '${d.kcalToday.round()} kcal', label: 'Estimado', tone: UpStatTone.heat),
                        UpStatTile(icon: const Icon(Icons.timer), value: '${d.minutesToday} min', label: 'Em treino'),
                        UpStatTile(icon: const Icon(Icons.trending_up), value: '+${d.profile.totalPoints}', label: 'Pontos', tone: UpStatTone.brand),
                      ],
                    ),
                  ],
                ),
              ),
            UpCard(child: UpStreakMeter(days: d.profile.streakDays)),
            Row(
              children: [
                Expanded(
                  child: UpCard(
                    radius: AppRadius.lg,
                    onTap: () => Navigator.of(context).push(MaterialPageRoute(builder: (_) => const ScanScreen())),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Container(
                          width: 38, height: 38,
                          decoration: BoxDecoration(color: AppColors.lime300, borderRadius: BorderRadius.circular(AppRadius.sm)),
                          alignment: Alignment.center,
                          child: const Icon(Icons.qr_code_scanner, color: AppColors.black, size: 20),
                        ),
                        const SizedBox(height: 8),
                        Text('Identificar aparelho', style: AppText.body.copyWith(color: AppColors.white, fontWeight: FontWeight.w600)),
                        Text('Fotografe e descubra para que serve.', style: AppText.bodySm.copyWith(color: AppColors.textMuted)),
                      ],
                    ),
                  ),
                ),
                const SizedBox(width: AppSpacing.gapCard),
                Expanded(
                  child: UpCard(
                    radius: AppRadius.lg,
                    onTap: () async {
                      await Navigator.of(context).push(MaterialPageRoute(builder: (_) => const CheckinScreen()));
                      _reload();
                    },
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Container(
                          width: 38, height: 38,
                          decoration: BoxDecoration(color: AppColors.cyan400, borderRadius: BorderRadius.circular(AppRadius.sm)),
                          alignment: Alignment.center,
                          child: const Icon(Icons.camera_alt, color: AppColors.black, size: 20),
                        ),
                        const SizedBox(height: 8),
                        Text('Registrar treino', style: AppText.body.copyWith(color: AppColors.white, fontWeight: FontWeight.w600)),
                        Text('Uma foto mantém seu foguinho.', style: AppText.bodySm.copyWith(color: AppColors.textMuted)),
                      ],
                    ),
                  ),
                ),
              ],
            ),
            UpSectionTitle('Suas fichas', action: UpChip(label: '${d.plans.length} fichas')),
            ...d.plans.map((p) => Padding(
                  padding: const EdgeInsets.only(bottom: AppSpacing.gapRow),
                  child: UpListRow(
                    title: '${p.name} · ${p.focus}',
                    subtitle: '${p.exercises.length} exercícios · ${p.estimatedMinutes} min',
                    selected: p.id == d.todayPlan?.id,
                    icon: Text(p.id.substring(0, 1), style: const TextStyle(fontWeight: FontWeight.w800, fontSize: 18, color: AppColors.white)),
                    onTap: () async {
                      await Navigator.of(context).push(MaterialPageRoute(builder: (_) => FichaScreen(plan: p)));
                      _reload();
                    },
                  ),
                )),
            const UpSectionTitle('Grupos musculares'),
            GridView.count(
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              crossAxisCount: 2,
              mainAxisSpacing: 10,
              crossAxisSpacing: 10,
              childAspectRatio: 4 / 3,
              children: d.muscleGroups.map((g) => _MuscleGroupTile(name: g, onTap: () => _openMuscleGroup(g))).toList(),
            ),
          ],
        );
      },
    );
  }

  String _weekdayLabel(int weekday) {
    const labels = ['seg', 'ter', 'qua', 'qui', 'sex', 'sáb', 'dom'];
    return labels[weekday - 1];
  }
}

class _HomeData {
  _HomeData({
    required this.profile,
    required this.plans,
    required this.todayPlan,
    required this.doneToday,
    required this.minutesToday,
    required this.kcalToday,
    required this.weeklyVolume,
    required this.muscleGroups,
  });

  final UserProfile profile;
  final List<WorkoutPlan> plans;
  final WorkoutPlan? todayPlan;
  final int doneToday;
  final int minutesToday;
  final double kcalToday;
  final Map<DateTime, double> weeklyVolume;
  final List<String> muscleGroups;
}

class _MuscleGroupTile extends StatelessWidget {
  const _MuscleGroupTile({required this.name, required this.onTap});
  final String name;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        decoration: BoxDecoration(
          gradient: AppColors.gradSurface,
          borderRadius: BorderRadius.circular(AppRadius.lg),
          boxShadow: AppGlow.hairline,
        ),
        alignment: Alignment.bottomLeft,
        padding: const EdgeInsets.all(12),
        child: Row(
          children: [
            const Icon(Icons.fitness_center, color: AppColors.lime300, size: 18),
            const SizedBox(width: 8),
            Text(name, style: AppText.body.copyWith(color: AppColors.white, fontWeight: FontWeight.w600)),
          ],
        ),
      ),
    );
  }
}
