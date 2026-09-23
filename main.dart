import 'package:flutter/material.dart';
import 'models/models.dart';
import 'services/database_service.dart';
import 'services/notification_service.dart';
import 'theme/app_theme.dart';
import 'screens/onboarding_screens.dart';
import 'screens/root_shell.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(const UpProApp());
}

class UpProApp extends StatelessWidget {
  const UpProApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'UP.PRO',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.dark,
      darkTheme: AppTheme.dark,
      themeMode: ThemeMode.dark,
      home: const _StartupGate(),
    );
  }
}

/// Decide se abre direto no app (onboarding já feito, dados salvos
/// localmente) ou nas telas de boas-vindas/quiz.
class _StartupGate extends StatefulWidget {
  const _StartupGate();

  @override
  State<_StartupGate> createState() => _StartupGateState();
}

class _StartupGateState extends State<_StartupGate> {
  late final Future<UserProfile> _future;

  @override
  void initState() {
    super.initState();
    _future = _bootstrap();
  }

  Future<UserProfile> _bootstrap() async {
    await NotificationService.instance.init();
    return DatabaseService.instance.getProfile();
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<UserProfile>(
      future: _future,
      builder: (context, snap) {
        if (!snap.hasData) {
          return const Scaffold(backgroundColor: Colors.black, body: Center(child: CircularProgressIndicator(color: Color(0xFFE4FF4D))));
        }
        return snap.data!.onboardingDone ? const RootShell() : const WelcomeScreen();
      },
    );
  }
}
