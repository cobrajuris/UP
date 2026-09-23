import 'package:flutter/material.dart';
import '../theme/tokens.dart';

enum UpButtonVariant { primary, solid, secondary, outline, ghost, cyan }

enum UpButtonSize { sm, md, lg }

/// Porta de components/core/Button.jsx
class UpButton extends StatefulWidget {
  const UpButton({
    super.key,
    required this.child,
    this.onPressed,
    this.variant = UpButtonVariant.primary,
    this.size = UpButtonSize.lg,
    this.block = false,
    this.iconLeft,
    this.iconRight,
  });

  final Widget child;
  final VoidCallback? onPressed;
  final UpButtonVariant variant;
  final UpButtonSize size;
  final bool block;
  final Widget? iconLeft;
  final Widget? iconRight;

  @override
  State<UpButton> createState() => _UpButtonState();
}

class _UpButtonState extends State<UpButton> {
  bool _pressed = false;

  double get _height => switch (widget.size) {
        UpButtonSize.sm => AppSpacing.hControlSm,
        UpButtonSize.md => 40,
        UpButtonSize.lg => AppSpacing.hControl,
      };

  EdgeInsets get _padding => switch (widget.size) {
        UpButtonSize.sm => const EdgeInsets.symmetric(horizontal: 16),
        UpButtonSize.md => const EdgeInsets.symmetric(horizontal: 20),
        UpButtonSize.lg => const EdgeInsets.symmetric(horizontal: 28),
      };

  TextStyle get _textStyle => switch (widget.size) {
        UpButtonSize.sm => AppText.label,
        UpButtonSize.md => AppText.bodySm,
        UpButtonSize.lg => AppText.body,
      };

  ({Gradient? gradient, Color? color, Color fg, List<BoxShadow>? shadow}) get _look {
    switch (widget.variant) {
      case UpButtonVariant.primary:
        return (gradient: AppColors.gradBrand, color: null, fg: AppColors.textOnBrand, shadow: AppGlow.brandSm);
      case UpButtonVariant.solid:
        return (gradient: null, color: AppColors.lime300, fg: AppColors.textOnBrand, shadow: null);
      case UpButtonVariant.secondary:
        return (gradient: null, color: AppColors.surface2, fg: AppColors.textPrimary, shadow: AppGlow.hairline);
      case UpButtonVariant.outline:
        return (gradient: null, color: Colors.transparent, fg: AppColors.textBrand, shadow: null);
      case UpButtonVariant.ghost:
        return (gradient: null, color: Colors.transparent, fg: AppColors.textSecondary, shadow: null);
      case UpButtonVariant.cyan:
        return (gradient: null, color: AppColors.cyan400, fg: AppColors.textOnBrand, shadow: null);
    }
  }

  @override
  Widget build(BuildContext context) {
    final disabled = widget.onPressed == null;
    final look = _look;
    final border = widget.variant == UpButtonVariant.outline
        ? Border.all(color: AppColors.lime400, width: 1.5)
        : null;

    return AnimatedScale(
      scale: _pressed ? AppMotion.pressScale : 1.0,
      duration: AppMotion.fast,
      curve: AppMotion.easeOut,
      child: Opacity(
        opacity: disabled ? 0.4 : 1,
        child: GestureDetector(
          onTapDown: disabled ? null : (_) => setState(() => _pressed = true),
          onTapUp: disabled ? null : (_) => setState(() => _pressed = false),
          onTapCancel: disabled ? null : () => setState(() => _pressed = false),
          onTap: widget.onPressed,
          child: Container(
            height: _height,
            width: widget.block ? double.infinity : null,
            padding: _padding,
            alignment: Alignment.center,
            decoration: BoxDecoration(
              gradient: look.gradient,
              color: look.color,
              borderRadius: BorderRadius.circular(AppRadius.pill),
              border: border,
              boxShadow: look.shadow,
            ),
            child: Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                if (widget.iconLeft != null) ...[widget.iconLeft!, const SizedBox(width: 8)],
                DefaultTextStyle(
                  style: _textStyle.copyWith(color: look.fg, fontWeight: FontWeight.w600),
                  child: widget.child,
                ),
                if (widget.iconRight != null) ...[const SizedBox(width: 8), widget.iconRight!],
              ],
            ),
          ),
        ),
      ),
    );
  }
}

enum UpIconButtonTone { lime, dark, surface, glass }

/// Porta de components/core/IconButton.jsx
class UpIconButton extends StatelessWidget {
  const UpIconButton({
    super.key,
    required this.icon,
    this.onPressed,
    this.tone = UpIconButtonTone.dark,
    this.size = 40,
    this.badge = false,
    this.label,
  });

  final Widget icon;
  final VoidCallback? onPressed;
  final UpIconButtonTone tone;
  final double size;
  final bool badge;
  final String? label;

  Color get _bg => switch (tone) {
        UpIconButtonTone.lime => AppColors.lime300,
        UpIconButtonTone.dark => Colors.black.withOpacity(0.45),
        UpIconButtonTone.surface => AppColors.surface2,
        UpIconButtonTone.glass => AppColors.surfaceGlass,
      };

  Color get _fg => tone == UpIconButtonTone.lime ? AppColors.black : AppColors.white;

  @override
  Widget build(BuildContext context) {
    return Semantics(
      label: label,
      button: true,
      child: Material(
        color: Colors.transparent,
        shape: const CircleBorder(),
        child: InkWell(
          customBorder: const CircleBorder(),
          onTap: onPressed,
          child: Container(
            width: size,
            height: size,
            alignment: Alignment.center,
            decoration: BoxDecoration(
              color: _bg,
              shape: BoxShape.circle,
              boxShadow: tone == UpIconButtonTone.dark || tone == UpIconButtonTone.surface
                  ? AppGlow.hairline
                  : null,
            ),
            child: Stack(
              clipBehavior: Clip.none,
              alignment: Alignment.center,
              children: [
                IconTheme(data: IconThemeData(color: _fg, size: size * 0.5), child: icon),
                if (badge)
                  Positioned(
                    top: size * 0.14,
                    right: size * 0.18,
                    child: Container(
                      width: 7,
                      height: 7,
                      decoration: BoxDecoration(
                        color: AppColors.heat500,
                        shape: BoxShape.circle,
                        boxShadow: AppGlow.heat,
                      ),
                    ),
                  ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
