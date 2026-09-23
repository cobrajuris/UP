import 'package:flutter/material.dart';
import '../theme/tokens.dart';

enum UpCardTone { raised, flat, inset, brand, outline }

/// Porta de components/core/Card.jsx
class UpCard extends StatelessWidget {
  const UpCard({
    super.key,
    required this.child,
    this.tone = UpCardTone.raised,
    this.radius = AppRadius.lg,
    this.padding = const EdgeInsets.all(AppSpacing.padCard),
    this.onTap,
  });

  final Widget child;
  final UpCardTone tone;
  final double radius;
  final EdgeInsets padding;
  final VoidCallback? onTap;

  @override
  Widget build(BuildContext context) {
    Gradient? gradient;
    Color? color;
    List<BoxShadow>? shadow = AppGlow.hairline;
    Border? border;
    Color fg = AppColors.textBody;

    switch (tone) {
      case UpCardTone.raised:
        gradient = AppColors.gradSurface;
        break;
      case UpCardTone.flat:
        color = AppColors.surface1;
        break;
      case UpCardTone.inset:
        color = AppColors.surfaceInset;
        shadow = null;
        break;
      case UpCardTone.brand:
        gradient = AppColors.gradBrand;
        shadow = AppGlow.brandMd;
        fg = AppColors.textOnBrand;
        break;
      case UpCardTone.outline:
        color = Colors.transparent;
        shadow = null;
        border = Border.all(color: AppColors.borderSubtle);
        break;
    }

    final content = Container(
      padding: padding,
      decoration: BoxDecoration(
        gradient: gradient,
        color: color,
        borderRadius: BorderRadius.circular(radius),
        boxShadow: shadow,
        border: border,
      ),
      child: DefaultTextStyle.merge(style: TextStyle(color: fg), child: child),
    );

    if (onTap == null) return content;
    return Material(
      color: Colors.transparent,
      borderRadius: BorderRadius.circular(radius),
      child: InkWell(
        borderRadius: BorderRadius.circular(radius),
        onTap: onTap,
        child: content,
      ),
    );
  }
}

enum UpChipTone { lime, gradient, cyan, dark, outline }

/// Porta de components/core/Chip.jsx
class UpChip extends StatelessWidget {
  const UpChip({
    super.key,
    required this.label,
    this.tone = UpChipTone.dark,
    this.dot,
    this.onTap,
  });

  final String label;
  final UpChipTone tone;
  final Color? dot;
  final VoidCallback? onTap;

  @override
  Widget build(BuildContext context) {
    Gradient? gradient;
    Color color;
    Color fg;
    switch (tone) {
      case UpChipTone.lime:
        color = AppColors.lime300;
        fg = AppColors.black;
        break;
      case UpChipTone.gradient:
        gradient = AppColors.gradBrand;
        color = Colors.transparent;
        fg = AppColors.black;
        break;
      case UpChipTone.cyan:
        color = AppColors.cyan400;
        fg = AppColors.black;
        break;
      case UpChipTone.dark:
        color = AppColors.surface3;
        fg = AppColors.textSecondary;
        break;
      case UpChipTone.outline:
        color = Colors.transparent;
        fg = AppColors.textSecondary;
        break;
    }

    final chip = Container(
      height: 26,
      padding: const EdgeInsets.symmetric(horizontal: 12),
      decoration: BoxDecoration(
        gradient: gradient,
        color: gradient == null ? color : null,
        borderRadius: BorderRadius.circular(AppRadius.pill),
        border: tone == UpChipTone.outline ? Border.all(color: AppColors.borderSubtle) : null,
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          if (dot != null) ...[
            Container(width: 6, height: 6, decoration: BoxDecoration(color: dot, shape: BoxShape.circle)),
            const SizedBox(width: 6),
          ],
          Text(label, style: AppText.label.copyWith(color: fg)),
        ],
      ),
    );

    if (onTap == null) return chip;
    return GestureDetector(onTap: onTap, child: chip);
  }
}

/// Porta de components/core/ListRow.jsx
class UpListRow extends StatelessWidget {
  const UpListRow({
    super.key,
    this.media,
    this.icon,
    required this.title,
    this.subtitle,
    this.trailing,
    this.chevron = true,
    this.selected = false,
    this.onTap,
  });

  final Widget? media;
  final Widget? icon;
  final String title;
  final String? subtitle;
  final Widget? trailing;
  final bool chevron;
  final bool selected;
  final VoidCallback? onTap;

  @override
  Widget build(BuildContext context) {
    return Material(
      color: Colors.transparent,
      borderRadius: BorderRadius.circular(AppRadius.md),
      child: InkWell(
        borderRadius: BorderRadius.circular(AppRadius.md),
        onTap: onTap,
        child: Container(
          constraints: const BoxConstraints(minHeight: AppSpacing.tapMin),
          padding: const EdgeInsets.all(AppSpacing.padRow),
          decoration: BoxDecoration(
            gradient: AppColors.gradSurface,
            borderRadius: BorderRadius.circular(AppRadius.md),
            border: selected ? Border.all(color: AppColors.lime400, width: 1.5) : null,
            boxShadow: selected ? null : AppGlow.hairline,
          ),
          child: Row(
            children: [
              if (media != null)
                ClipRRect(
                  borderRadius: BorderRadius.circular(AppRadius.sm),
                  child: SizedBox(width: 44, height: 44, child: media),
                )
              else if (icon != null)
                Container(
                  width: 40,
                  height: 40,
                  decoration: BoxDecoration(color: AppColors.surface3, borderRadius: BorderRadius.circular(AppRadius.sm)),
                  alignment: Alignment.center,
                  child: IconTheme(data: const IconThemeData(color: AppColors.white, size: 20), child: icon!),
                ),
              if (media != null || icon != null) const SizedBox(width: 12),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Text(title, maxLines: 1, overflow: TextOverflow.ellipsis, style: AppText.body.copyWith(color: AppColors.textPrimary, fontWeight: FontWeight.w600)),
                    if (subtitle != null)
                      Text(subtitle!, maxLines: 1, overflow: TextOverflow.ellipsis, style: AppText.bodySm.copyWith(color: AppColors.textMuted)),
                  ],
                ),
              ),
              if (trailing != null) trailing!
              else if (chevron)
                const Icon(Icons.chevron_right, color: AppColors.ink400, size: 20),
            ],
          ),
        ),
      ),
    );
  }
}

/// Porta de components/core/OptionCard.jsx
class UpOptionCard extends StatelessWidget {
  const UpOptionCard({
    super.key,
    this.icon,
    required this.title,
    this.subtitle,
    this.selected = false,
    this.onTap,
  });

  final Widget? icon;
  final String title;
  final String? subtitle;
  final bool selected;
  final VoidCallback? onTap;

  @override
  Widget build(BuildContext context) {
    return Material(
      color: Colors.transparent,
      borderRadius: BorderRadius.circular(AppRadius.md),
      child: InkWell(
        borderRadius: BorderRadius.circular(AppRadius.md),
        onTap: onTap,
        child: Container(
          constraints: const BoxConstraints(minHeight: 64),
          padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
          decoration: BoxDecoration(
            gradient: AppColors.gradSurface,
            borderRadius: BorderRadius.circular(AppRadius.md),
            border: selected ? Border.all(color: AppColors.lime400, width: 1.5) : null,
            boxShadow: selected ? null : AppGlow.hairline,
          ),
          child: Row(
            children: [
              if (icon != null)
                Container(
                  width: 44,
                  height: 44,
                  decoration: BoxDecoration(color: AppColors.surface3, borderRadius: BorderRadius.circular(AppRadius.sm)),
                  alignment: Alignment.center,
                  child: IconTheme(
                    data: IconThemeData(color: selected ? AppColors.lime300 : AppColors.white, size: 20),
                    child: icon!,
                  ),
                ),
              if (icon != null) const SizedBox(width: 12),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Text(title, style: AppText.body.copyWith(color: AppColors.textPrimary, fontWeight: FontWeight.w600)),
                    if (subtitle != null)
                      Text(subtitle!, style: AppText.bodySm.copyWith(color: AppColors.textMuted)),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

/// Porta de components/core/SectionTitle.jsx
class UpSectionTitle extends StatelessWidget {
  const UpSectionTitle(this.title, {super.key, this.action});
  final String title;
  final Widget? action;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 4),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(title, style: AppText.title3.copyWith(color: AppColors.textPrimary)),
          if (action != null) action!,
        ],
      ),
    );
  }
}

/// Porta de components/core/SegmentedControl.jsx
class UpSegmentedControl extends StatelessWidget {
  const UpSegmentedControl({super.key, required this.options, required this.value, required this.onChanged});
  final List<String> options;
  final String value;
  final ValueChanged<String> onChanged;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(4),
      decoration: BoxDecoration(
        color: AppColors.surface2,
        borderRadius: BorderRadius.circular(AppRadius.pill),
        boxShadow: AppGlow.hairline,
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: options.map((o) {
          final on = o == value;
          return Padding(
            padding: const EdgeInsets.symmetric(horizontal: 2),
            child: GestureDetector(
              onTap: () => onChanged(o),
              child: AnimatedContainer(
                duration: AppMotion.fast,
                height: 38,
                padding: const EdgeInsets.symmetric(horizontal: 22),
                alignment: Alignment.center,
                decoration: BoxDecoration(
                  color: on ? AppColors.lime300 : Colors.transparent,
                  borderRadius: BorderRadius.circular(AppRadius.pill),
                ),
                child: Text(
                  o,
                  style: AppText.bodySm.copyWith(
                    color: on ? AppColors.black : AppColors.textMuted,
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ),
            ),
          );
        }).toList(),
      ),
    );
  }
}

/// Porta de components/media/MediaTile.jsx
class UpMediaTile extends StatelessWidget {
  const UpMediaTile({super.key, required this.image, this.caption, this.aspectRatio = 1, this.onTap});
  final ImageProvider image;
  final String? caption;
  final double aspectRatio;
  final VoidCallback? onTap;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: AspectRatio(
        aspectRatio: aspectRatio,
        child: ClipRRect(
          borderRadius: BorderRadius.circular(AppRadius.lg),
          child: Stack(
            fit: StackFit.expand,
            children: [
              Container(color: AppColors.surface3),
              Image(image: image, fit: BoxFit.cover),
              if (caption != null)
                Container(decoration: const BoxDecoration(gradient: AppColors.scrimMedia)),
              if (caption != null)
                Positioned(
                  left: 12,
                  right: 12,
                  bottom: 10,
                  child: Text(caption!, style: AppText.body.copyWith(color: AppColors.white, fontWeight: FontWeight.w600)),
                ),
            ],
          ),
        ),
      ),
    );
  }
}
