import 'dart:io';
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'package:share_plus/share_plus.dart' show Share;
import '../services/database_service.dart';
import '../theme/tokens.dart';
import '../widgets/buttons.dart';
import '../widgets/data_widgets.dart';
import '../widgets/navigation_widgets.dart';
import '../widgets/surfaces.dart';

/// Porta de ui_kits/uppro-app/Scan.jsx (CheckinScreen) — registro rápido do
/// dia com foto, sem precisar abrir uma ficha inteira. Soma no streak/pontos
/// pelo mesmo mecanismo de uma sessão de treino.
class CheckinScreen extends StatefulWidget {
  const CheckinScreen({super.key});

  @override
  State<CheckinScreen> createState() => _CheckinScreenState();
}

class _CheckinScreenState extends State<CheckinScreen> {
  XFile? _photo;
  bool _saving = false;

  Future<void> _takePhoto() async {
    try {
      final file = await ImagePicker().pickImage(source: ImageSource.camera, imageQuality: 80);
      if (file != null) setState(() => _photo = file);
    } catch (_) {
      if (mounted) ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Não foi possível abrir a câmera.')));
    }
  }

  Future<void> _confirm() async {
    setState(() => _saving = true);
    final sessionId = await DatabaseService.instance.startSession(planId: 'checkin', planName: 'Registro do dia');
    await DatabaseService.instance.finishSession(sessionId, pointsEarned: 20);
    final profile = await DatabaseService.instance.getProfile();
    if (!mounted) return;
    Navigator.of(context).pushReplacement(MaterialPageRoute(
      builder: (_) => CelebrateScreen(planName: 'Registro do dia', minutes: 0, points: 20, totalExercises: 0, streakDays: profile.streakDays),
    ));
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.black,
      body: UpScreenScaffold(
        header: UpScreenHeader(
          left: UpIconButton(tone: UpIconButtonTone.lime, icon: const Icon(Icons.chevron_left), onPressed: () => Navigator.of(context).maybePop()),
          title: 'Registrar treino',
        ),
        footer: UpButton(block: true, onPressed: _saving ? null : _confirm, child: Text(_saving ? 'Salvando...' : 'Confirmar e somar +1')),
        body: [
          Text('Uma foto confirma que você treinou hoje e mantém sua sequência viva.',
              textAlign: TextAlign.center, style: AppText.bodySm.copyWith(color: Colors.white.withOpacity(0.7))),
          GestureDetector(
            onTap: _takePhoto,
            child: AspectRatio(
              aspectRatio: 3 / 4,
              child: Container(
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(AppRadius.xl),
                  border: Border.all(color: AppColors.borderSubtle),
                ),
                clipBehavior: Clip.antiAlias,
                child: _photo == null
                    ? Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          const Icon(Icons.camera_alt, color: AppColors.textMuted, size: 30),
                          const SizedBox(height: 10),
                          Text('Toque para tirar a foto', style: AppText.bodySm.copyWith(color: AppColors.textMuted)),
                        ],
                      )
                    : Image.file(File(_photo!.path), fit: BoxFit.cover),
              ),
            ),
          ),
          const UpCard(child: UpStreakMeter(days: 5)),
        ],
      ),
    );
  }
}

/// Porta de ui_kits/uppro-app/Scan.jsx (CelebrateScreen).
class CelebrateScreen extends StatelessWidget {
  const CelebrateScreen({
    super.key,
    required this.planName,
    required this.minutes,
    required this.points,
    required this.totalExercises,
    this.streakDays,
  });

  final String planName;
  final int minutes;
  final int points;
  final int totalExercises;
  final int? streakDays;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.black,
      body: SafeArea(
        child: Column(
          children: [
            Align(
              alignment: Alignment.centerLeft,
              child: Padding(
                padding: const EdgeInsets.symmetric(horizontal: AppSpacing.gutterScreen, vertical: 10),
                child: UpIconButton(
                  tone: UpIconButtonTone.surface,
                  icon: const Icon(Icons.close),
                  onPressed: () => Navigator.of(context).popUntil((route) => route.isFirst),
                ),
              ),
            ),
            Expanded(
              child: Padding(
                padding: const EdgeInsets.symmetric(horizontal: AppSpacing.gutterScreen),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    UpBadge(icon: '🔥', size: 124, label: '${streakDays ?? ''} dias seguidos'.trim(), sublabel: 'Sequência mantida'),
                    const SizedBox(height: 18),
                    Text('Treino registrado. Você evoluiu hoje.', textAlign: TextAlign.center, style: AppText.title1.copyWith(color: AppColors.white)),
                    const SizedBox(height: 10),
                    Text(
                      minutes > 0 ? '$planName concluído · $minutes min · +$points pontos' : '$planName · +$points pontos',
                      textAlign: TextAlign.center,
                      style: AppText.bodySm.copyWith(color: Colors.white.withOpacity(0.75)),
                    ),
                    const SizedBox(height: 18),
                    UpCard(
                      tone: UpCardTone.brand,
                      radius: AppRadius.xl,
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceAround,
                        children: [
                          _MiniStat(value: totalExercises > 0 ? '$totalExercises' : '—', label: 'Exercícios'),
                          _MiniStat(value: '+$points', label: 'Pontos'),
                          _MiniStat(value: '${streakDays ?? 0}', label: 'Sequência'),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ),
            Padding(
              padding: const EdgeInsets.fromLTRB(AppSpacing.gutterScreen, 0, AppSpacing.gutterScreen, 24),
              child: Column(
                children: [
                  UpButton(
                    variant: UpButtonVariant.secondary,
                    block: true,
                    iconLeft: const Icon(Icons.share, size: 18),
                    onPressed: () => Share.share(
                      minutes > 0
                          ? 'Acabei de treinar $planName no UP.PRO 💪 $minutes min, +$points pontos!'
                          : 'Treino registrado no UP.PRO hoje 🔥 +$points pontos!',
                    ),
                    child: const Text('Compartilhar'),
                  ),
                  const SizedBox(height: 10),
                  UpButton(
                    block: true,
                    onPressed: () => Navigator.of(context).popUntil((route) => route.isFirst),
                    child: const Text('Voltar ao início'),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _MiniStat extends StatelessWidget {
  const _MiniStat({required this.value, required this.label});
  final String value;
  final String label;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text(value, style: AppText.title2.copyWith(color: AppColors.black, fontWeight: FontWeight.w800)),
        Text(label, style: AppText.label.copyWith(color: AppColors.black.withOpacity(0.7))),
      ],
    );
  }
}
