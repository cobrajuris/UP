import 'dart:convert';
import 'package:flutter/services.dart' show rootBundle;
import '../models/models.dart';

/// Biblioteca de fichas de treino prontas (assets/data/workout_plans.json).
/// De propósito: não existe editor para o usuário criar fichas do zero —
/// o UP.PRO monta a divisão certa a partir do quiz (objetivo + experiência).
class WorkoutPlanRepository {
  WorkoutPlanRepository._();
  static final WorkoutPlanRepository instance = WorkoutPlanRepository._();

  List<WorkoutPlan>? _cache;

  Future<List<WorkoutPlan>> all() async {
    if (_cache != null) return _cache!;
    final raw = await rootBundle.loadString('assets/data/workout_plans.json');
    final list = jsonDecode(raw) as List<dynamic>;
    _cache = list.map((e) => WorkoutPlan.fromJson(e as Map<String, dynamic>)).toList();
    return _cache!;
  }

  Future<WorkoutPlan?> byId(String id) async {
    final list = await all();
    for (final p in list) {
      if (p.id == id) return p;
    }
    return null;
  }

  /// Escolhe a divisão de treino (full body / upper-lower / push-pull-legs /
  /// ABCD) a partir das respostas do quiz de onboarding.
  Future<List<WorkoutPlan>> recommendedSplit({required String goal, required String level}) async {
    final list = await all();
    String split;
    if (level == 'iniciante') {
      split = 'full_body';
    } else if (level == 'retomando') {
      split = 'upper_lower';
    } else {
      split = goal == 'hipertrofia' ? 'ppl' : 'abcd';
    }
    final plans = list.where((p) => p.split == split).toList();
    plans.sort((a, b) => a.id.compareTo(b.id));
    return plans;
  }
}
