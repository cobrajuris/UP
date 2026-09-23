import 'package:flutter/material.dart';
import '../models/models.dart';
import '../data/workout_plan_repository.dart';
import '../services/database_service.dart';
import '../theme/tokens.dart';
import '../widgets/buttons.dart';
import '../widgets/surfaces.dart';
import '../widgets/navigation_widgets.dart';
import 'root_shell.dart';

/// Porta de ui_kits/uppro-app/Onboarding.jsx (WelcomeScreen + QuizScreen).
class WelcomeScreen extends StatelessWidget {
  const WelcomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.black,
      body: Stack(
        children: [
          Positioned(
            top: 0,
            left: 0,
            right: 0,
            height: MediaQuery.of(context).size.height * 0.42,
            child: Container(decoration: const BoxDecoration(gradient: AppColors.gradHeader)),
          ),
          SafeArea(
            child: Column(
              children: [
                const SizedBox(height: 24),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 18, vertical: 10),
                  decoration: BoxDecoration(color: AppColors.black, borderRadius: BorderRadius.circular(AppRadius.md)),
                  child: const Text('UP.PRO', style: TextStyle(color: AppColors.lime300, fontWeight: FontWeight.w800, fontSize: 20)),
                ),
                const Spacer(),
                Padding(
                  padding: const EdgeInsets.fromLTRB(AppSpacing.gutterScreen, 0, AppSpacing.gutterScreen, 28),
                  child: Column(
                    children: [
                      Text('Bem-vindo', style: AppText.body.copyWith(color: Colors.white.withOpacity(0.75))),
                      const SizedBox(height: 14),
                      Text(
                        'Seu treino. Sua evolução.\nSeu ritmo.',
                        textAlign: TextAlign.center,
                        style: AppText.title1.copyWith(color: AppColors.white),
                      ),
                      const SizedBox(height: 14),
                      Text(
                        'Um personal virtual no seu celular para você saber o que fazer, como treinar e como continuar evoluindo.',
                        textAlign: TextAlign.center,
                        style: AppText.bodySm.copyWith(color: Colors.white.withOpacity(0.7)),
                      ),
                      const SizedBox(height: 18),
                      UpButton(
                        block: true,
                        onPressed: () => Navigator.of(context).push(MaterialPageRoute(builder: (_) => const QuizScreen())),
                        child: const Text('Começar'),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class QuizScreen extends StatefulWidget {
  const QuizScreen({super.key});

  @override
  State<QuizScreen> createState() => _QuizScreenState();
}

class _QuizScreenState extends State<QuizScreen> {
  String _goal = 'hipertrofia';
  String _level = 'iniciante';
  bool _saving = false;

  static const _goals = [
    ('emagrecer', Icons.local_fire_department, 'Emagrecer', 'Queimar gordura e ganhar fôlego'),
    ('hipertrofia', Icons.fitness_center, 'Ganhar massa', 'Hipertrofia e força'),
    ('saude', Icons.favorite, 'Saúde geral', 'Criar o hábito de treinar'),
  ];

  static const _levels = [
    ('iniciante', 'Nunca treinei', 'Quero aprender do zero'),
    ('retomando', 'Já treinei antes', 'Estou voltando à rotina'),
    ('avancado', 'Treino sempre', 'Quero evoluir a carga'),
  ];

  Future<void> _finish() async {
    setState(() => _saving = true);
    final profile = await DatabaseService.instance.getProfile();
    await DatabaseService.instance.saveProfile(profile.copyWith(
      goal: _goal,
      level: _level,
      onboardingDone: true,
    ));
    final plans = await WorkoutPlanRepository.instance.recommendedSplit(goal: _goal, level: _level);
    await DatabaseService.instance.setSelectedPlanIds(plans.map((p) => p.id).toList());
    if (!mounted) return;
    Navigator.of(context).pushAndRemoveUntil(
      MaterialPageRoute(builder: (_) => const RootShell()),
      (route) => false,
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.black,
      body: UpScreenScaffold(
        header: UpScreenHeader(
          left: UpIconButton(tone: UpIconButtonTone.lime, icon: const Icon(Icons.chevron_left), onPressed: () => Navigator.of(context).maybePop()),
          right: TextButton(onPressed: _saving ? null : _finish, child: Text('Pular', style: AppText.bodySm.copyWith(color: Colors.white.withOpacity(0.8)))),
        ),
        body: [
          Column(
            children: [
              Text('Qual é o seu objetivo?', textAlign: TextAlign.center, style: AppText.title2.copyWith(color: AppColors.white)),
              const SizedBox(height: 8),
              Text('Suas respostas montam a primeira ficha de treino. Dá para mudar depois.',
                  textAlign: TextAlign.center, style: AppText.bodySm.copyWith(color: Colors.white.withOpacity(0.7))),
            ],
          ),
          ..._goals.map((g) => UpOptionCard(
                icon: Icon(g.$2),
                title: g.$3,
                subtitle: g.$4,
                selected: _goal == g.$1,
                onTap: () => setState(() => _goal = g.$1),
              )),
          const UpSectionTitle('Sua experiência'),
          ..._levels.map((l) => UpOptionCard(
                icon: const Icon(Icons.directions_run),
                title: l.$2,
                subtitle: l.$3,
                selected: _level == l.$1,
                onTap: () => setState(() => _level = l.$1),
              )),
          const SizedBox(height: 4),
        ],
        footer: UpButton(block: true, onPressed: _saving ? null : _finish, child: Text(_saving ? 'Montando sua ficha...' : 'Continuar')),
      ),
    );
  }
}
