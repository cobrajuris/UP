import 'dart:convert';
import 'package:flutter/services.dart' show rootBundle;
import '../models/models.dart';

/// Catálogo de exercícios embutido no app (assets/data/exercises.json).
/// Não depende de internet nem de login — é o "banco de exercícios" pedido:
/// nome, músculo trabalhado, instruções e variações.
class ExerciseRepository {
  ExerciseRepository._();
  static final ExerciseRepository instance = ExerciseRepository._();

  List<Exercise>? _cache;

  Future<List<Exercise>> all() async {
    if (_cache != null) return _cache!;
    final raw = await rootBundle.loadString('assets/data/exercises.json');
    final list = jsonDecode(raw) as List<dynamic>;
    _cache = list.map((e) => Exercise.fromJson(e as Map<String, dynamic>)).toList();
    return _cache!;
  }

  Future<Exercise?> byId(String id) async {
    final list = await all();
    for (final e in list) {
      if (e.id == id) return e;
    }
    return null;
  }

  Future<List<Exercise>> byMuscleGroup(String group) async {
    final list = await all();
    return list.where((e) => e.muscleGroup == group).toList();
  }

  Future<List<String>> muscleGroups() async {
    final list = await all();
    return list.map((e) => e.muscleGroup).toSet().toList();
  }

  Future<List<Exercise>> search(String query) async {
    final q = query.trim().toLowerCase();
    if (q.isEmpty) return all();
    final list = await all();
    return list.where((e) => e.name.toLowerCase().contains(q) || e.muscleGroup.toLowerCase().contains(q)).toList();
  }
}
