import 'package:flutter/material.dart';
import '../services/rest_timer_service.dart';
import '../theme/tokens.dart';
import '../widgets/navigation_widgets.dart';
import 'home_screen.dart';
import 'progress_screen.dart';
import 'profile_screen.dart';
import 'treinos_screen.dart';

/// Casca com a tab bar inferior + o cronômetro de descanso flutuante,
/// visível por cima de qualquer aba enquanto está contando (o "relógio
/// flutuante" pedido para o descanso entre séries).
class RootShell extends StatefulWidget {
  const RootShell({super.key});

  @override
  State<RootShell> createState() => _RootShellState();
}

class _RootShellState extends State<RootShell> {
  String _tab = 'home';

  static const _items = [
    UpTabItem(value: 'home', label: 'Início', icon: Icons.home_rounded),
    UpTabItem(value: 'treinos', label: 'Treinos', icon: Icons.fitness_center),
    UpTabItem(value: 'evolucao', label: 'Evolução', icon: Icons.bar_chart_rounded),
    UpTabItem(value: 'perfil', label: 'Perfil', icon: Icons.person_rounded),
  ];

  Widget _screenFor(String tab) {
    switch (tab) {
      case 'treinos':
        return const TreinosScreen();
      case 'evolucao':
        return const ProgressScreen();
      case 'perfil':
        return const ProfileScreen();
      case 'home':
      default:
        return const HomeScreen();
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.black,
      body: Stack(
        children: [
          Column(
            children: [
              Expanded(child: _screenFor(_tab)),
              UpTabBar(items: _items, value: _tab, onChanged: (v) => setState(() => _tab = v)),
              SizedBox(height: MediaQuery.of(context).padding.bottom),
            ],
          ),
          const Positioned(right: 16, left: 16, bottom: 78, child: _FloatingRestTimer()),
        ],
      ),
    );
  }
}

class _FloatingRestTimer extends StatelessWidget {
  const _FloatingRestTimer();

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: RestTimerService.instance,
      builder: (context, _) {
        final timer = RestTimerService.instance;
        if (!timer.isRunning) return const SizedBox.shrink();
        final m = (timer.remainingSeconds ~/ 60).toString().padLeft(2, '0');
        final s = (timer.remainingSeconds % 60).toString().padLeft(2, '0');
        return SafeArea(
          top: false,
          child: Material(
            color: Colors.transparent,
            child: InkWell(
              borderRadius: BorderRadius.circular(AppRadius.pill),
              onTap: () => Navigator.of(context).push(
                MaterialPageRoute(builder: (_) => const ActiveWorkoutResumeNotice(), fullscreenDialog: true),
              ),
              child: Container(
                height: 56,
                padding: const EdgeInsets.symmetric(horizontal: 18),
                decoration: BoxDecoration(
                  color: Colors.black.withOpacity(0.82),
                  borderRadius: BorderRadius.circular(AppRadius.pill),
                  border: Border.all(color: AppColors.lime300, width: 1.5),
                  boxShadow: AppGlow.brandMd,
                ),
                child: Row(
                  children: [
                    const Icon(Icons.timer, color: AppColors.lime300, size: 20),
                    const SizedBox(width: 10),
                    Expanded(
                      child: Text(
                        timer.label == null ? 'Descansando' : 'Descanso · ${timer.label}',
                        overflow: TextOverflow.ellipsis,
                        style: AppText.bodySm.copyWith(color: AppColors.white),
                      ),
                    ),
                    Text('$m:$s', style: AppText.title3.copyWith(color: AppColors.lime300, fontWeight: FontWeight.w800)),
                    const SizedBox(width: 10),
                    GestureDetector(
                      onTap: () => timer.stop(),
                      child: const Icon(Icons.close, color: AppColors.textMuted, size: 18),
                    ),
                  ],
                ),
              ),
            ),
          ),
        );
      },
    );
  }
}

/// Placeholder simples: tocar no relógio flutuante avisa que o treino ativo
/// continua na aba onde foi iniciado (evita perder o fluxo de navegação).
class ActiveWorkoutResumeNotice extends StatelessWidget {
  const ActiveWorkoutResumeNotice({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.black,
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(24),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              const Icon(Icons.timer, color: AppColors.lime300, size: 40),
              const SizedBox(height: 12),
              Text('Volte para a tela do exercício para continuar registrando as séries.',
                  textAlign: TextAlign.center, style: AppText.body.copyWith(color: AppColors.white)),
              const SizedBox(height: 16),
              TextButton(onPressed: () => Navigator.of(context).pop(), child: const Text('Fechar')),
            ],
          ),
        ),
      ),
    );
  }
}
