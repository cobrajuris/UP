import 'package:flutter/material.dart';
import '../models/models.dart';
import '../services/database_service.dart';
import '../services/notification_service.dart';
import '../theme/tokens.dart';
import '../widgets/data_widgets.dart';
import '../widgets/navigation_widgets.dart';
import '../widgets/surfaces.dart';
import 'onboarding_screens.dart';

class ProfileScreen extends StatefulWidget {
  const ProfileScreen({super.key});

  @override
  State<ProfileScreen> createState() => _ProfileScreenState();
}

class _ProfileScreenState extends State<ProfileScreen> {
  late Future<UserProfile> _future;

  @override
  void initState() {
    super.initState();
    _future = DatabaseService.instance.getProfile();
  }

  void _reload() => setState(() => _future = DatabaseService.instance.getProfile());

  Future<void> _editProfile(UserProfile profile) async {
    final nameCtrl = TextEditingController(text: profile.name);
    final heightCtrl = TextEditingController(text: profile.heightCm?.toStringAsFixed(0) ?? '');
    final weightCtrl = TextEditingController(text: profile.weightKg?.toStringAsFixed(1) ?? '');
    final saved = await showDialog<bool>(
      context: context,
      builder: (_) => AlertDialog(
        backgroundColor: AppColors.surface1,
        title: const Text('Editar perfil', style: TextStyle(color: AppColors.white)),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            TextField(controller: nameCtrl, style: const TextStyle(color: AppColors.white), decoration: const InputDecoration(labelText: 'Nome')),
            TextField(controller: heightCtrl, keyboardType: TextInputType.number, style: const TextStyle(color: AppColors.white), decoration: const InputDecoration(labelText: 'Altura (cm)')),
            TextField(controller: weightCtrl, keyboardType: const TextInputType.numberWithOptions(decimal: true), style: const TextStyle(color: AppColors.white), decoration: const InputDecoration(labelText: 'Peso (kg)')),
          ],
        ),
        actions: [
          TextButton(onPressed: () => Navigator.of(context).pop(false), child: const Text('Cancelar')),
          TextButton(onPressed: () => Navigator.of(context).pop(true), child: const Text('Salvar')),
        ],
      ),
    );
    if (saved == true) {
      await DatabaseService.instance.saveProfile(profile.copyWith(
        name: nameCtrl.text.trim(),
        heightCm: double.tryParse(heightCtrl.text.replaceAll(',', '.')),
        weightKg: double.tryParse(weightCtrl.text.replaceAll(',', '.')),
      ));
      _reload();
    }
  }

  Future<void> _editReminders() async {
    final selected = <int>{1, 3, 5}; // seg, qua, sex por padrão
    TimeOfDay time = const TimeOfDay(hour: 19, minute: 0);
    const labels = {1: 'Seg', 2: 'Ter', 3: 'Qua', 4: 'Qui', 5: 'Sex', 6: 'Sáb', 7: 'Dom'};
    final saved = await showDialog<bool>(
      context: context,
      builder: (context) => StatefulBuilder(
        builder: (context, setDialogState) => AlertDialog(
          backgroundColor: AppColors.surface1,
          title: const Text('Lembretes de treino', style: TextStyle(color: AppColors.white)),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Wrap(
                spacing: 6,
                children: labels.entries.map((e) {
                  final on = selected.contains(e.key);
                  return ChoiceChip(
                    label: Text(e.value),
                    selected: on,
                    onSelected: (v) => setDialogState(() => v ? selected.add(e.key) : selected.remove(e.key)),
                  );
                }).toList(),
              ),
              const SizedBox(height: 12),
              TextButton(
                onPressed: () async {
                  final picked = await showTimePicker(context: context, initialTime: time);
                  if (picked != null) setDialogState(() => time = picked);
                },
                child: Text('Horário: ${time.hour.toString().padLeft(2, '0')}:${time.minute.toString().padLeft(2, '0')}'),
              ),
            ],
          ),
          actions: [
            TextButton(onPressed: () => Navigator.of(context).pop(false), child: const Text('Cancelar')),
            TextButton(onPressed: () => Navigator.of(context).pop(true), child: const Text('Salvar')),
          ],
        ),
      ),
    );
    if (saved == true) {
      if (selected.isEmpty) {
        await NotificationService.instance.cancelWeeklyReminders();
      } else {
        await NotificationService.instance.setWeeklyReminders(weekdays: selected.toList(), hour: time.hour, minute: time.minute);
      }
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Lembretes atualizados.')));
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<UserProfile>(
      future: _future,
      builder: (context, snap) {
        if (!snap.hasData) return const Center(child: CircularProgressIndicator(color: AppColors.lime300));
        final p = snap.data!;
        return UpScreenScaffold(
          header: const UpScreenHeader(title: 'Perfil'),
          body: [
            Column(
              children: [
                Container(
                  width: 84, height: 84,
                  decoration: BoxDecoration(shape: BoxShape.circle, gradient: AppColors.gradSurface, boxShadow: AppGlow.brandMd, border: Border.all(color: AppColors.lime300, width: 3)),
                  alignment: Alignment.center,
                  child: const Icon(Icons.person, color: AppColors.white, size: 40),
                ),
                const SizedBox(height: 8),
                Text(p.name.isEmpty ? 'Sem nome ainda' : p.name, style: AppText.title2.copyWith(color: AppColors.white, fontWeight: FontWeight.w700)),
                const SizedBox(height: 6),
                UpChip(label: 'Nível ${p.gamificationLevel} · Constância', tone: UpChipTone.gradient),
              ],
            ),
            UpCard(child: UpStreakMeter(days: p.streakDays)),
            UpCard(
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceAround,
                children: [
                  UpStatTile(value: p.heightCm == null ? '—' : '${(p.heightCm! / 100).toStringAsFixed(2)} m', label: 'Altura'),
                  UpStatTile(value: p.weightKg == null ? '—' : '${p.weightKg!.toStringAsFixed(0)} kg', label: 'Peso'),
                  UpStatTile(value: p.bmi == null ? '—' : p.bmi!.toStringAsFixed(1), label: 'IMC'),
                ],
              ),
            ),
            const UpSectionTitle('Configurações'),
            UpListRow(icon: const Icon(Icons.edit), title: 'Editar perfil', subtitle: 'Nome, altura e peso', onTap: () => _editProfile(p)),
            const SizedBox(height: AppSpacing.gapRow),
            UpListRow(
              icon: const Icon(Icons.assignment),
              title: 'Refazer o quiz',
              subtitle: 'Atualiza suas fichas',
              onTap: () => Navigator.of(context).push(MaterialPageRoute(builder: (_) => const QuizScreen())),
            ),
            const SizedBox(height: AppSpacing.gapRow),
            UpListRow(icon: const Icon(Icons.notifications), title: 'Lembretes de treino', subtitle: 'Escolha os dias e o horário', onTap: _editReminders),
            const SizedBox(height: AppSpacing.gapRow),
            UpListRow(
              icon: const Icon(Icons.workspace_premium),
              title: 'UP.PRO Premium',
              subtitle: 'Fichas ilimitadas e personal (em breve)',
              onTap: () => showDialog(
                context: context,
                builder: (_) => AlertDialog(
                  backgroundColor: AppColors.surface1,
                  title: const Text('UP.PRO Premium', style: TextStyle(color: AppColors.white)),
                  content: const Text(
                    'A assinatura via Google Play Billing é a Fase 4 do roadmap — depende de conta no Google Play Console. Ver ROADMAP.md.',
                    style: TextStyle(color: AppColors.textSecondary),
                  ),
                  actions: [TextButton(onPressed: () => Navigator.of(context).pop(), child: const Text('Entendi'))],
                ),
              ),
            ),
            const SizedBox(height: AppSpacing.gapRow),
            const UpListRow(icon: Icon(Icons.help_outline), title: 'Ajuda', subtitle: 'Dúvidas sobre exercícios', chevron: false),
          ],
        );
      },
    );
  }
}
