import 'dart:io';
import 'package:camera/camera.dart';
import 'package:flutter/material.dart';
import 'package:path_provider/path_provider.dart';
import 'package:permission_handler/permission_handler.dart';
import '../models/models.dart';
import '../services/database_service.dart';
import '../theme/tokens.dart';
import '../widgets/buttons.dart';
import '../widgets/surfaces.dart';

/// Porta de ui_kits/uppro-app/Scan.jsx (ScanScreen).
///
/// IMPORTANTE (ver ROADMAP.md, Fase 1.5): isto é câmera real + um catálogo
/// local de aparelhos — a foto é tirada de verdade e fica salva no
/// histórico, mas quem diz QUAL aparelho é a foto é o usuário escolhendo na
/// lista (busca local, sem IA paga, como foi pedido). Reconhecimento visual
/// automático (a foto "adivinhar" sozinha o aparelho) exigiria treinar um
/// modelo de visão computacional — não dá para treinar isso aqui, mas o
/// roadmap explica o caminho (TFLite/ML Kit) para adicionar depois.
class ScanScreen extends StatefulWidget {
  const ScanScreen({super.key});

  @override
  State<ScanScreen> createState() => _ScanScreenState();
}

class _ScanScreenState extends State<ScanScreen> {
  CameraController? _controller;
  Future<void>? _initFuture;
  String? _error;
  EquipmentCatalogItem? _identified;
  String? _photoPath;

  @override
  void initState() {
    super.initState();
    _initFuture = _initCamera();
  }

  Future<void> _initCamera() async {
    try {
      final status = await Permission.camera.request();
      if (!status.isGranted) {
        setState(() => _error = 'Permissão de câmera negada. Ative em Configurações > Apps > UP.PRO > Permissões.');
        return;
      }
      final cameras = await availableCameras();
      if (cameras.isEmpty) {
        setState(() => _error = 'Nenhuma câmera encontrada neste dispositivo.');
        return;
      }
      final back = cameras.firstWhere((c) => c.lensDirection == CameraLensDirection.back, orElse: () => cameras.first);
      _controller = CameraController(back, ResolutionPreset.medium, enableAudio: false);
      await _controller!.initialize();
    } catch (e) {
      setState(() => _error = 'Não foi possível abrir a câmera. Verifique a permissão nas configurações do app.');
    }
  }

  Future<void> _capture() async {
    if (_controller == null || !_controller!.value.isInitialized) return;
    try {
      final file = await _controller!.takePicture();
      final dir = await getApplicationDocumentsDirectory();
      final saved = '${dir.path}/equip_${DateTime.now().millisecondsSinceEpoch}.jpg';
      await File(file.path).copy(saved);
      setState(() => _photoPath = saved);
      _pickFromCatalog();
    } catch (e) {
      if (mounted) ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Não foi possível tirar a foto.')));
    }
  }

  Future<void> _pickFromCatalog() async {
    final result = await showModalBottomSheet<EquipmentCatalogItem>(
      context: context,
      backgroundColor: AppColors.surface1,
      isScrollControlled: true,
      shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(AppRadius.xl))),
      builder: (_) => const _EquipmentPicker(),
    );
    if (result != null) setState(() => _identified = result);
  }

  Future<void> _confirmAndSave() async {
    if (_identified == null) return;
    await DatabaseService.instance.addEquipment(EquipmentEntry(
      name: _identified!.name,
      muscleGroup: _identified!.muscleGroup,
      description: _identified!.description,
      photoPath: _photoPath,
      scannedAt: DateTime.now(),
    ));
    if (mounted) Navigator.of(context).pop();
  }

  @override
  void dispose() {
    _controller?.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.black,
      body: Stack(
        children: [
          Positioned.fill(
            child: FutureBuilder<void>(
              future: _initFuture,
              builder: (context, snap) {
                if (_error != null) {
                  return Center(
                    child: Padding(
                      padding: const EdgeInsets.all(24),
                      child: Text(_error!, textAlign: TextAlign.center, style: AppText.body.copyWith(color: AppColors.textSecondary)),
                    ),
                  );
                }
                if (snap.connectionState != ConnectionState.done || _controller == null) {
                  return const Center(child: CircularProgressIndicator(color: AppColors.lime300));
                }
                return CameraPreview(_controller!);
              },
            ),
          ),
          SafeArea(
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: AppSpacing.gutterScreen),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  UpIconButton(tone: UpIconButtonTone.dark, icon: const Icon(Icons.chevron_left), onPressed: () => Navigator.of(context).maybePop()),
                ],
              ),
            ),
          ),
          if (_error == null)
            const Align(
              alignment: Alignment.center,
              child: _ScanFrame(),
            ),
          Align(
            alignment: Alignment.bottomCenter,
            child: SafeArea(
              child: Padding(
                padding: const EdgeInsets.fromLTRB(AppSpacing.gutterScreen, 0, AppSpacing.gutterScreen, 30),
                child: _identified == null
                    ? Column(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          Text('Aponte para o aparelho, fotografe e escolha na lista.',
                              textAlign: TextAlign.center, style: AppText.bodySm.copyWith(color: Colors.white.withOpacity(0.85))),
                          const SizedBox(height: 12),
                          UpButton(
                            block: true,
                            onPressed: _error == null ? _capture : null,
                            iconLeft: const Icon(Icons.qr_code_scanner, size: 18),
                            child: const Text('Identificar aparelho'),
                          ),
                        ],
                      )
                    : UpCard(
                        radius: AppRadius.xl,
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Row(
                              children: [
                                const UpChip(label: 'Identificado', tone: UpChipTone.lime),
                                const SizedBox(width: 10),
                                Expanded(child: Text(_identified!.name, style: AppText.title3.copyWith(color: AppColors.white, fontWeight: FontWeight.w700))),
                              ],
                            ),
                            const SizedBox(height: 8),
                            Text(_identified!.description, style: AppText.bodySm.copyWith(color: AppColors.textSecondary, height: 1.55)),
                            const SizedBox(height: 10),
                            Wrap(spacing: 8, children: [
                              UpChip(label: _identified!.muscleGroup, tone: UpChipTone.outline),
                              UpChip(label: _identified!.level, tone: UpChipTone.outline),
                              const UpChip(label: 'Máquina', tone: UpChipTone.outline),
                            ]),
                            const SizedBox(height: 12),
                            UpButton(block: true, onPressed: _confirmAndSave, child: const Text('Salvar no meu histórico')),
                          ],
                        ),
                      ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _ScanFrame extends StatelessWidget {
  const _ScanFrame();
  @override
  Widget build(BuildContext context) {
    return Container(
      width: 230,
      height: 230,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(AppRadius.xl),
        border: Border.all(color: AppColors.lime300, width: 2),
        boxShadow: AppGlow.brandLg,
      ),
    );
  }
}

class EquipmentCatalogItem {
  const EquipmentCatalogItem({required this.name, required this.muscleGroup, required this.level, required this.description});
  final String name;
  final String muscleGroup;
  final String level;
  final String description;
}

const kEquipmentCatalog = <EquipmentCatalogItem>[
  EquipmentCatalogItem(name: 'Puxada alta (pulley)', muscleGroup: 'Costas', level: 'Iniciante', description: 'Trabalha as costas (dorsal) e os bíceps. Sente com os joelhos presos, puxe a barra até a altura do queixo e volte devagar.'),
  EquipmentCatalogItem(name: 'Remada sentada no cabo', muscleGroup: 'Costas', level: 'Iniciante', description: 'Puxe o triângulo em direção ao abdômen com o tronco ereto, contraindo as escápulas.'),
  EquipmentCatalogItem(name: 'Leg press 45°', muscleGroup: 'Pernas', level: 'Iniciante', description: 'Empurre a plataforma com os pés na largura dos ombros, descendo até 90° nos joelhos.'),
  EquipmentCatalogItem(name: 'Cadeira extensora', muscleGroup: 'Pernas', level: 'Iniciante', description: 'Estenda os joelhos contra a resistência, sentado, para isolar o quadríceps.'),
  EquipmentCatalogItem(name: 'Mesa/cadeira flexora', muscleGroup: 'Pernas', level: 'Iniciante', description: 'Flexione os joelhos trazendo o rolo em direção aos glúteos, trabalhando o posterior de coxa.'),
  EquipmentCatalogItem(name: 'Smith machine', muscleGroup: 'Peito/Pernas', level: 'Intermediário', description: 'Barra guiada em trilho vertical — usada para supino, agachamento e outros movimentos com mais segurança.'),
  EquipmentCatalogItem(name: 'Peck deck (crucifixo máquina)', muscleGroup: 'Peito', level: 'Iniciante', description: 'Aproxime os braços à frente do peito, cotovelos levemente flexionados, isolando o peitoral.'),
  EquipmentCatalogItem(name: 'Cross-over (polia dupla)', muscleGroup: 'Peito', level: 'Intermediário', description: 'Cruze os cabos na frente do corpo contraindo o peito, tronco levemente inclinado à frente.'),
  EquipmentCatalogItem(name: 'Desenvolvimento máquina', muscleGroup: 'Ombro', level: 'Iniciante', description: 'Empurre os punhos para cima sentado, trabalhando o deltóide.'),
  EquipmentCatalogItem(name: 'Cadeira abdutora', muscleGroup: 'Pernas/Glúteos', level: 'Iniciante', description: 'Afaste as pernas contra a resistência, trabalhando o glúteo médio.'),
  EquipmentCatalogItem(name: 'Cadeira adutora', muscleGroup: 'Pernas', level: 'Iniciante', description: 'Aproxime as pernas contra a resistência, trabalhando a face interna da coxa.'),
  EquipmentCatalogItem(name: 'Panturrilha em pé', muscleGroup: 'Pernas', level: 'Iniciante', description: 'Suba na ponta dos pés com carga nos ombros, trabalhando a panturrilha.'),
  EquipmentCatalogItem(name: 'Graviton (assistido)', muscleGroup: 'Costas/Tríceps', level: 'Iniciante', description: 'Máquina que reduz seu peso corporal para facilitar barra fixa e paralelas assistidas.'),
  EquipmentCatalogItem(name: 'Esteira', muscleGroup: 'Cardio', level: 'Iniciante', description: 'Caminhada ou corrida com velocidade e inclinação ajustáveis.'),
  EquipmentCatalogItem(name: 'Bicicleta ergométrica', muscleGroup: 'Cardio', level: 'Iniciante', description: 'Pedalada estacionária com carga ajustável para treino cardiovascular.'),
  EquipmentCatalogItem(name: 'Banco romano (hiperextensão)', muscleGroup: 'Costas/Lombar', level: 'Iniciante', description: 'Fortalece a lombar e os glúteos com o quadril apoiado, elevando e descendo o tronco.'),
];

class _EquipmentPicker extends StatefulWidget {
  const _EquipmentPicker();
  @override
  State<_EquipmentPicker> createState() => _EquipmentPickerState();
}

class _EquipmentPickerState extends State<_EquipmentPicker> {
  String _query = '';

  @override
  Widget build(BuildContext context) {
    final filtered = kEquipmentCatalog.where((e) => e.name.toLowerCase().contains(_query.toLowerCase())).toList();
    return SafeArea(
      child: Padding(
        padding: const EdgeInsets.all(AppSpacing.gutterScreen),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Text('Qual aparelho é este?', style: AppText.title3.copyWith(color: AppColors.white)),
            const SizedBox(height: 8),
            TextField(
              onChanged: (v) => setState(() => _query = v),
              style: const TextStyle(color: AppColors.white),
              decoration: InputDecoration(
                hintText: 'Buscar no catálogo...',
                hintStyle: const TextStyle(color: AppColors.textMuted),
                filled: true,
                fillColor: AppColors.surface2,
                border: OutlineInputBorder(borderRadius: BorderRadius.circular(AppRadius.md), borderSide: BorderSide.none),
              ),
            ),
            const SizedBox(height: 12),
            Flexible(
              child: ListView.separated(
                shrinkWrap: true,
                itemCount: filtered.length,
                separatorBuilder: (_, __) => const SizedBox(height: 8),
                itemBuilder: (_, i) {
                  final e = filtered[i];
                  return UpListRow(icon: const Icon(Icons.fitness_center), title: e.name, subtitle: e.muscleGroup, onTap: () => Navigator.of(context).pop(e));
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}
