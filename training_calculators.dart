/// Cálculos de treino pedidos na lista original: 1RM (carga máxima estimada)
/// e volume de treino. Fórmulas padrão da literatura de treinamento de força.
class TrainingCalculators {
  TrainingCalculators._();

  /// 1RM estimado pela fórmula de Epley — a mais usada em apps de treino.
  /// 1RM = peso × (1 + repetições / 30)
  static double epley1Rm({required double weightKg, required int reps}) {
    if (reps <= 0) return 0;
    if (reps == 1) return weightKg;
    return weightKg * (1 + reps / 30);
  }

  /// 1RM estimado pela fórmula de Brzycki — alternativa mais conservadora
  /// para repetições altas.
  static double brzycki1Rm({required double weightKg, required int reps}) {
    if (reps <= 0) return 0;
    if (reps == 1) return weightKg;
    if (reps >= 37) return weightKg; // fórmula degenera acima disso
    return weightKg * (36 / (37 - reps));
  }

  /// Volume de uma série: peso × repetições.
  static double setVolume({required double weightKg, required int reps}) => weightKg * reps;

  /// Volume total de uma lista de séries (peso × reps somado).
  static double totalVolume(Iterable<({double weightKg, int reps})> sets) {
    var total = 0.0;
    for (final s in sets) {
      total += setVolume(weightKg: s.weightKg, reps: s.reps);
    }
    return total;
  }

  /// Estimativa grosseira de calorias gastas numa sessão de musculação,
  /// baseada em MET (~6.0 para treino de força moderado/intenso) e peso
  /// corporal. Serve como indicador, não como medição precisa — para dados
  /// reais de frequência cardíaca ver ROADMAP.md (Fase 3, Health Connect).
  static double estimateCalories({required int minutes, double bodyWeightKg = 75, double met = 6.0}) {
    // kcal/min = MET × 3.5 × peso(kg) / 200
    final kcalPerMin = met * 3.5 * bodyWeightKg / 200;
    return kcalPerMin * minutes;
  }

  /// Pontos de gamificação por sessão concluída, proporcional ao volume e à
  /// duração — usado na tela de celebração e no nível do perfil.
  static int pointsForSession({required double totalVolumeKg, required int minutes}) {
    final base = 100;
    final volumeBonus = (totalVolumeKg / 50).round();
    final timeBonus = (minutes / 2).round();
    return base + volumeBonus + timeBonus;
  }
}
