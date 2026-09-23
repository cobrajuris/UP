import 'package:flutter/material.dart';
import '../data/workout_plan_repository.dart';
import '../models/models.dart';
import '../services/database_service.dart';
import '../theme/tokens.dart';
import '../widgets/navigation_widgets.dart';
import '../widgets/surfaces.dart';
import 'ficha_screen.dart';

/// Aba "Treinos": mostra a divisão ativa do usuário e permite conhecer as
/// outras divisões da biblioteca (full body, upper/lower, push/pull/legs,
/// ABCD) — sem editor de fichas, só o catálogo pronto.
class TreinosScreen extends StatefulWidget {
  const TreinosScreen({super.key});

  @override
  State<TreinosScreen> createState() => _TreinosScreenState();
}

class _TreinosScreenState extends State<TreinosScreen> {
  late Future<_TreinosData> _future;

  @override
  void initState() {
    super.initState();
    _future = _load();
  }

  Future<_TreinosData> _load() async {
    final selectedIds = await DatabaseService.instance.getSelectedPlanIds();
    final all = await WorkoutPlanRepository.instance.all();
    final meus = all.where((p) => selectedIds.contains(p.id)).toList();
    final outras = <String, List<WorkoutPlan>>{};
    for (final p in all) {
      if (selectedIds.contains(p.id)) continue;
      outras.putIfAbsent(p.split, () => []).add(p);
    }
    return _TreinosData(meus: meus, outras: outras);
  }

  String _splitLabel(String split) => switch (split) {
        'full_body' => 'Corpo inteiro (iniciante)',
        'upper_lower' => 'Superior / Inferior',
        'ppl' => 'Push / Pull / Legs',
        'abcd' => 'Divisão ABCD',
        _ => split,
      };

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<_TreinosData>(
      future: _future,
      builder: (context, snap) {
        if (!snap.hasData) return const Center(child: CircularProgressIndicator(color: AppColors.lime300));
        final d = snap.data!;
        return UpScreenScaffold(
          header: const UpScreenHeader(title: 'Treinos'),
          body: [
            const UpSectionTitle('Sua divisão'),
            ...d.meus.map((p) => Padding(
                  padding: const EdgeInsets.only(bottom: AppSpacing.gapRow),
                  child: UpListRow(
                    icon: Text(p.id.substring(0, 1), style: const TextStyle(fontWeight: FontWeight.w800, color: AppColors.white)),
                    title: '${p.name} · ${p.focus}',
                    subtitle: '${p.exercises.length} exercícios · ${p.estimatedMinutes} min',
                    onTap: () => Navigator.of(context).push(MaterialPageRoute(builder: (_) => FichaScreen(plan: p))),
                  ),
                )),
            const UpSectionTitle('Outras divisões da biblioteca'),
            ...d.outras.entries.map((entry) => UpCard(
                  radius: AppRadius.lg,
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(_splitLabel(entry.key), style: AppText.body.copyWith(color: AppColors.white, fontWeight: FontWeight.w600)),
                      const SizedBox(height: 8),
                      ...entry.value.map((p) => Padding(
                            padding: const EdgeInsets.only(bottom: AppSpacing.gapRow),
                            child: UpListRow(
                              title: '${p.name} · ${p.focus}',
                              subtitle: '${p.exercises.length} exercícios · ${p.estimatedMinutes} min',
                              onTap: () => Navigator.of(context).push(MaterialPageRoute(builder: (_) => FichaScreen(plan: p))),
                            ),
                          )),
                    ],
                  ),
                )),
          ],
        );
      },
    );
  }
}

class _TreinosData {
  _TreinosData({required this.meus, required this.outras});
  final List<WorkoutPlan> meus;
  final Map<String, List<WorkoutPlan>> outras;
}
