import 'package:flutter/material.dart';
import 'tokens.dart';

class AppTheme {
  AppTheme._();

  static ThemeData get dark {
    final base = ThemeData.dark(useMaterial3: true);
    return base.copyWith(
      scaffoldBackgroundColor: AppColors.bgApp,
      canvasColor: AppColors.bgApp,
      primaryColor: AppColors.lime300,
      colorScheme: base.colorScheme.copyWith(
        primary: AppColors.lime300,
        secondary: AppColors.cyan400,
        surface: AppColors.surface1,
        error: AppColors.heat500,
      ),
      textTheme: base.textTheme.apply(
        fontFamilyFallback: AppText.fontFamilyFallback,
        bodyColor: AppColors.textBody,
        displayColor: AppColors.textPrimary,
      ),
      splashFactory: InkRipple.splashFactory,
      pageTransitionsTheme: const PageTransitionsTheme(
        builders: {
          TargetPlatform.android: CupertinoPageTransitionsBuilder(),
          TargetPlatform.iOS: CupertinoPageTransitionsBuilder(),
        },
      ),
    );
  }
}
