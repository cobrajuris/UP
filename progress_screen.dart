import 'package:flutter/material.dart';
import '../models/models.dart';
import '../services/database_service.dart';
import '../theme/tokens.dart';
import '../widgets/data_widgets.dart';
import '../widgets/navigation_widgets.dart';
import '../widgets/surfaces.dart';

/// Porta de ui_kits/uppro-app/Progress.jsx (ProgressScreen) — agora com
/// dados reais vindos do histórico local em vez de números fixos.
class ProgressScreen extends StatefulWidget {
  const ProgressScreen({super.key});

  @override
  State<ProgressScreen> createState() => _ProgressScreenState();
}

class _ProgressScreenState extends State<ProgressScreen> {
  late Future<_ProgressData> _future;

  @override
  void initState() {
    super.initState();
    _future = _load();
  }

  Future<_ProgressData> _load() async {
    final weekly = await DatabaseService.instance.weeklyVolume();
    final sessions = await DatabaseService.instance.recentSessions(limit: 100);
    final monthlyCount = await DatabaseService.instance.monthlySessionCount();
    final profile = await DatabaseService.instance.getProfile();
    final equipment = await DatabaseService.instance.equipmentLog();

    final planCounts = <String, int>{};
    for (final s in sessions) {
      planCounts[s.planName] = (planCounts[s.planName] ?? 0) + 1;
    }
    String? topPlan;
    var topCount = 0;
    planCounts.forEach((k, v) {
      if (v > topCount) {
        topCount = v;
        topPlan = k;
      }
    });

    final totalVolumeMonth = weekly.values.fold<double>(0, (a, b) => a + b);

    return _ProgressData(
      weekly: weekly,
      monthlyCount: monthlyCount,
      profile: profile,
      equipmentCount: equipment.length,
      topPlan: topPlan,
      topPlanCount: topCount,
      totalVolumeWeek: totalVolumeMonth,
      recentSessions: sessions.take(8).toList(),
    );
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<_ProgressData>(
      future: _future,
      builder: (context, snap) {
        if (!snap.hasData) return const Center(child: CircularProgressIndicator(color: AppColors.lime300));
        final d = snap.data!;
        final daysTrained = d.weekly.values.where((v) => v > 0).length;
        return UpScreenScaffold(
          header: const UpScreenHeader(title: 'Evolução'),
          body: [
            UpCard(
              radius: AppRadius.xl,
              child: Column(
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      const UpChip(label: 'Semana', tone: UpChipTone.dark, dot: AppColors.lime300),
                      UpChip(label: '$daysTrained de 7', tone: UpChipTone.lime),
                    ],
                  ),
                  const SizedBox(height: 12),
                  UpBarChart(
                    height: 160,
                    data: d.weekly.entries
                        .map((e) => UpBarChartPoint(label: _weekdayLabel(e.key.weekday), value: e.value, active: e.value > 0))
                        .toList(),
                  ),
                ],
              ),
            ),
            Row(
              children: [
                Expanded(child: UpCard(child: UpStatTile(value: '${d.monthlyCount}', label: 'Treinos no mês', tone: UpStatTone.brand))),
                const SizedBox(width: AppSpacing.gapCard),
                Expanded(child: UpCard(child: UpStatTile(value: '${d.totalVolumeWeek.round()} kg', label: 'Volume na semana', tone: UpStatTone.cyan))),
              ],
            ),
            UpSectionTitle('Conquistas', action: UpChip(label: '${_unlockedCount(d)} de 4')),
            UpCard(
              radius: AppRadius.xl,
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  UpBadge(icon: '🔥', size: 62, label: '${d.profile.streakDays} dias', sublabel: 'Sequência', locked: d.profile.streakDays == 0),
                  UpBadge(
                    icon: '🏋️',
                    size: 62,
                    label: d.topPlan ?? '—',
                    sublabel: '${d.topPlanCount} vezes',
                    locked: d.topPlan == null,
                  ),
                  UpBadge(icon: '📸', size: 62, label: 'Aparelhos', sublabel: '${d.equipmentCount} escaneados', locked: d.equipmentCount == 0),
                  UpBadge(icon: '🏅', size: 62, label: '30 dias', sublabel: d.profile.streakDays >= 30 ? 'Conquistado' : 'Bloqueado', locked: d.profile.streakDays < 30),
                ],
              ),
            ),
            const UpSectionTitle('Histórico'),
            if (d.recentSessions.isEmpty)
              UpCard(child: Text('Nenhum treino concluído ainda.', style: AppText.bodySm.copyWith(color: AppColors.textMuted)))
            else
              ...d.recentSessions.map((s) => Padding(
                    padding: const EdgeInsets.only(bottom: AppSpacing.gapRow),
                    child: UpListRow(
                      icon: const Icon(Icons.fitness_center),
                      title: s.planName,
                      subtitle: '${_dateLabel(s.finishedAt!)} · ${s.durationMinutes} min',
                      chevron: false,
                    ),
                  )),
          ],
        );
      },
    );
  }

  int _unlockedCount(_ProgressData d) {
    var n = 0;
    if (d.profile.streakDays > 0) n++;
    if (d.topPlan != null) n++;
    if (d.equipmentCount > 0) n++;
    if (d.profile.streakDays >= 30) n++;
    return n;
  }

  String _weekdayLabel(int weekday) {
    const labels = ['seg', 'ter', 'qua', 'qui', 'sex', 'sáb', 'dom'];
    return labels[weekday - 1];
  }

  String _dateLabel(DateTime date) {
    final now = DateTime.now();
    final today = DateTime(now.year, now.month, now.day);
    final day = DateTime(date.year, date.month, date.day);
    final diff = today.difference(day).inDays;
    if (diff == 0) return 'Hoje';
    if (diff == 1) return 'Ontem';
    const weekdays = ['seg', 'ter', 'qua', 'qui', 'sex', 'sáb', 'dom'];
    if (diff < 7) return weekdays[date.weekday - 1];
    return '${date.day.toString().padLeft(2, '0')}/${date.month.toString().padLeft(2, '0')}';
  }
}

class _ProgressData {
  _ProgressData({
    required this.weekly,
    required this.monthlyCount,
    required this.profile,
    required this.equipmentCount,
    required this.topPlan,
    required this.topPlanCount,
    required this.totalVolumeWeek,
    required this.recentSessions,
  });

  final Map<DateTime, double> weekly;
  final int monthlyCount;
  final UserProfile profile;
  final int equipmentCount;
  final String? topPlan;
  final int topPlanCount;
  final double totalVolumeWeek;
  final List<WorkoutSession> recentSessions;
}
