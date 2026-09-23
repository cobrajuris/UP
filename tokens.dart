// Tokens portados 1:1 de UP.PRO Design System/design-system/tokens/*.css
// Qualquer ajuste de marca (cor, fonte, raio) deve ser feito só aqui.
import 'package:flutter/material.dart';

class AppColors {
  AppColors._();

  // Base ink
  static const black = Color(0xFF000000);
  static const ink900 = Color(0xFF0A0A0A);
  static const ink850 = Color(0xFF111111);
  static const ink800 = Color(0xFF171717);
  static const ink750 = Color(0xFF1E1E1E);
  static const ink700 = Color(0xFF242424);
  static const ink600 = Color(0xFF2E2E2E);
  static const ink500 = Color(0xFF3A3A3A);
  static const ink400 = Color(0xFF5A5A5A);
  static const ink300 = Color(0xFF8A8A8A);
  static const ink200 = Color(0xFFB5B5B5);
  static const ink100 = Color(0xFFE2E2E2);
  static const white = Color(0xFFFFFFFF);

  // Brand lime
  static const lime100 = Color(0xFFF3FFC2);
  static const lime200 = Color(0xFFEBFF8F);
  static const lime300 = Color(0xFFE4FF4D);
  static const lime400 = Color(0xFFD3F02B);
  static const lime500 = Color(0xFFC2DE1F);
  static const lime600 = Color(0xFFA3BC17);
  static const lime700 = Color(0xFF7D8F12);
  static const lime800 = Color(0xFF55620C);
  static const lime900 = Color(0xFF2E3507);

  // Spring green
  static const spring300 = Color(0xFFA9F08A);
  static const spring400 = Color(0xFF86E57F);
  static const spring500 = Color(0xFF4ED47B);
  static const spring600 = Color(0xFF2FB463);

  // Cyan
  static const cyan300 = Color(0xFF7FE3F7);
  static const cyan400 = Color(0xFF4FC3F7);
  static const cyan500 = Color(0xFF22B8E6);
  static const cyan600 = Color(0xFF158FB8);

  // Heat
  static const heat400 = Color(0xFFFF7A45);
  static const heat500 = Color(0xFFFF4B2B);
  static const heat600 = Color(0xFFD93213);

  // Semantic aliases
  static const bgApp = black;
  static const surface1 = ink850;
  static const surface2 = ink750;
  static const surface3 = ink700;
  static const surfaceInset = Color(0x0AFFFFFF); // rgba(255,255,255,.04)
  static const surfaceGlass = Color(0x0FFFFFFF); // rgba(255,255,255,.06)

  static const textPrimary = white;
  static const textBody = ink100;
  static const textSecondary = ink200;
  static const textMuted = ink300;
  static const textDisabled = ink400;
  static const textOnBrand = black;
  static const textBrand = lime300;

  static const borderHairline = Color(0x14FFFFFF); // rgba(255,255,255,.08)
  static const borderSubtle = Color(0x1FFFFFFF); // rgba(255,255,255,.12)
  static const borderStrong = Color(0x38FFFFFF); // rgba(255,255,255,.22)

  static const accentDanger = heat500;

  static const gradBrand = LinearGradient(
    begin: Alignment.centerLeft,
    end: Alignment.centerRight,
    colors: [spring400, lime300],
  );

  static const gradOrb = LinearGradient(
    begin: Alignment(0, -1),
    end: Alignment(0.6, 1),
    colors: [cyan400, Color(0xFF9BEE6B), lime300],
  );

  static const gradSurface = LinearGradient(
    begin: Alignment.topCenter,
    end: Alignment.bottomCenter,
    colors: [ink750, Color(0xFF121212)],
  );

  static const gradHeader = LinearGradient(
    begin: Alignment.topCenter,
    end: Alignment.bottomCenter,
    colors: [Color(0xFFB9CC2A), Color(0xFF6E7C18), Color(0xFF1A1D08), black],
    stops: [0.0, 0.34, 0.70, 1.0],
  );

  static const scrimMedia = LinearGradient(
    begin: Alignment.topCenter,
    end: Alignment.bottomCenter,
    colors: [Color(0x00000000), Color(0xC7000000)],
    stops: [0.4, 1.0],
  );

  static const scrimTop = LinearGradient(
    begin: Alignment.topCenter,
    end: Alignment.bottomCenter,
    colors: [Color(0x8C000000), Color(0x00000000)],
  );

  static const gradGlowFloor = RadialGradient(
    center: Alignment(0, -1),
    radius: 1.1,
    colors: [Color(0x38C4DE1F), Color(0x00000000)],
    stops: [0.0, 0.7],
  );
}

class AppGlow {
  AppGlow._();

  static List<BoxShadow> brandSm = [
    BoxShadow(color: AppColors.lime300.withOpacity(0.35), blurRadius: 12),
  ];
  static List<BoxShadow> brandMd = [
    BoxShadow(color: AppColors.lime300.withOpacity(0.30), blurRadius: 28),
  ];
  static List<BoxShadow> brandLg = [
    BoxShadow(color: AppColors.lime500.withOpacity(0.28), blurRadius: 64),
  ];
  static List<BoxShadow> heat = [
    BoxShadow(color: AppColors.heat500.withOpacity(0.45), blurRadius: 16),
  ];
  static List<BoxShadow> hairline = [
    BoxShadow(
      color: Colors.white.withOpacity(0.06),
      blurRadius: 0,
      spreadRadius: 1,
    ),
  ];
  static List<BoxShadow> card = [
    BoxShadow(color: Colors.black.withOpacity(0.5), blurRadius: 24, offset: const Offset(0, 8)),
  ];
}

class AppRadius {
  AppRadius._();
  static const xs = 6.0;
  static const sm = 10.0;
  static const md = 14.0; // list rows, chips
  static const lg = 20.0; // cards
  static const xl = 28.0; // large panels, media tiles
  static const xl2 = 36.0;
  static const pill = 999.0;
}

class AppSpacing {
  AppSpacing._();
  static const s0 = 0.0;
  static const s1 = 4.0;
  static const s2 = 8.0;
  static const s3 = 12.0;
  static const s4 = 16.0;
  static const s5 = 20.0;
  static const s6 = 24.0;
  static const s7 = 32.0;
  static const s8 = 40.0;
  static const s9 = 48.0;
  static const s10 = 64.0;

  static const gutterScreen = 16.0;
  static const gapCard = 12.0;
  static const gapRow = 10.0;
  static const padCard = 16.0;
  static const padRow = 12.0;
  static const hControl = 48.0;
  static const hControlSm = 34.0;
  static const hTabBar = 64.0;
  static const hHeader = 56.0;
  static const tapMin = 44.0;
}

class AppMotion {
  AppMotion._();
  static const instant = Duration(milliseconds: 80);
  static const fast = Duration(milliseconds: 140);
  static const base = Duration(milliseconds: 220);
  static const slow = Duration(milliseconds: 400);
  static const celebrate = Duration(milliseconds: 700);

  static const easeStandard = Cubic(0.2, 0, 0, 1);
  static const easeOut = Cubic(0.16, 1, 0.3, 1);
  static const easeInOut = Cubic(0.65, 0, 0.35, 1);
  static const easeSpring = Cubic(0.34, 1.56, 0.64, 1);

  static const pressScale = 0.97;
}

class AppText {
  AppText._();
  // Fira Sans não está embutida por padrão (evita depender de download de
  // fonte em build): usa a stack de fallback do design system.
  static const fontFamilyFallback = <String>[
    'Helvetica Neue',
    'Helvetica',
    'Arial',
  ];

  static const display1 = TextStyle(fontSize: 44, height: 1.08, fontWeight: FontWeight.w800);
  static const display2 = TextStyle(fontSize: 34, height: 1.14, fontWeight: FontWeight.w800);
  static const title1 = TextStyle(fontSize: 26, height: 1.2, fontWeight: FontWeight.w700);
  static const title2 = TextStyle(fontSize: 22, height: 1.25, fontWeight: FontWeight.w700);
  static const title3 = TextStyle(fontSize: 18, height: 1.3, fontWeight: FontWeight.w700);
  static const body = TextStyle(fontSize: 15, height: 1.45, fontWeight: FontWeight.w400);
  static const bodySm = TextStyle(fontSize: 13, height: 1.45, fontWeight: FontWeight.w400);
  static const label = TextStyle(fontSize: 12, height: 1.3, fontWeight: FontWeight.w600);
  static const caption = TextStyle(fontSize: 11, height: 1.3, fontWeight: FontWeight.w400);
  static const metric = TextStyle(fontSize: 32, height: 1.0, fontWeight: FontWeight.w800);
}
