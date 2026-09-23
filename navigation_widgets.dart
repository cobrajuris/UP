import 'package:flutter/material.dart';
import '../theme/tokens.dart';

/// Porta de components/navigation/ScreenHeader.jsx
class UpScreenHeader extends StatelessWidget {
  const UpScreenHeader({
    super.key,
    this.left,
    this.title,
    this.subtitle,
    this.right,
    this.avatarUrl,
    this.alignStart = false,
  });

  final Widget? left;
  final String? title;
  final String? subtitle;
  final Widget? right;
  final String? avatarUrl;
  final bool alignStart;

  @override
  Widget build(BuildContext context) {
    final titles = (title == null && subtitle == null)
        ? const SizedBox.shrink()
        : Column(
            crossAxisAlignment: alignStart ? CrossAxisAlignment.start : CrossAxisAlignment.center,
            mainAxisSize: MainAxisSize.min,
            children: [
              if (title != null) Text(title!, style: AppText.title3.copyWith(color: AppColors.textPrimary, fontWeight: FontWeight.w700)),
              if (subtitle != null) Text(subtitle!, style: AppText.bodySm.copyWith(color: Colors.white.withOpacity(0.72))),
            ],
          );

    return SizedBox(
      height: AppSpacing.hHeader,
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: AppSpacing.gutterScreen, vertical: 4),
        child: Row(
          children: [
            if (left != null) left!,
            if (avatarUrl != null) ...[
              const SizedBox(width: 10),
              ClipOval(
                child: Image.network(avatarUrl!, width: 38, height: 38, fit: BoxFit.cover,
                    errorBuilder: (_, __, ___) => Container(width: 38, height: 38, color: AppColors.surface3)),
              ),
            ],
            if (alignStart) ...[const SizedBox(width: 10), titles],
            if (!alignStart) Expanded(child: Center(child: titles)),
            if (alignStart) const Spacer(),
            if (right != null) right!,
          ],
        ),
      ),
    );
  }
}

class UpTabItem {
  const UpTabItem({required this.value, required this.label, required this.icon});
  final String value;
  final String label;
  final IconData icon;
}

/// Porta de components/navigation/TabBar.jsx
class UpTabBar extends StatelessWidget {
  const UpTabBar({super.key, required this.items, required this.value, required this.onChanged});
  final List<UpTabItem> items;
  final String value;
  final ValueChanged<String> onChanged;

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: AppSpacing.hTabBar,
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: items.map((it) {
          final on = it.value == value;
          return Padding(
            padding: const EdgeInsets.symmetric(horizontal: 4),
            child: GestureDetector(
              onTap: () => onChanged(it.value),
              child: AnimatedContainer(
                duration: AppMotion.base,
                width: 52,
                height: 52,
                alignment: Alignment.center,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  gradient: on ? AppColors.gradOrb : null,
                  color: on ? null : AppColors.ink700,
                  boxShadow: on ? AppGlow.brandMd : null,
                ),
                child: Icon(it.icon, color: on ? AppColors.black : AppColors.ink200, size: 22),
              ),
            ),
          );
        }).toList(),
      ),
    );
  }
}

/// Porta do componente `Screen` (Shared.jsx): topo com glow em gradiente,
/// corpo rolável e rodapé/tab bar opcionais.
class UpScreenScaffold extends StatelessWidget {
  const UpScreenScaffold({
    super.key,
    required this.header,
    required this.body,
    this.footer,
    this.tabBar,
    this.headerGlow = true,
    this.scrollable = true,
  });

  final Widget header;
  final List<Widget> body;
  final Widget? footer;
  final Widget? tabBar;
  final bool headerGlow;
  final bool scrollable;

  @override
  Widget build(BuildContext context) {
    return Container(
      color: AppColors.black,
      child: Stack(
        children: [
          if (headerGlow)
            Positioned(
              top: 0,
              left: 0,
              right: 0,
              height: 340,
              child: Container(decoration: const BoxDecoration(gradient: AppColors.gradHeader)),
            ),
          SafeArea(
            child: Column(
              children: [
                header,
                Expanded(
                  child: scrollable
                      ? SingleChildScrollView(
                          padding: const EdgeInsets.fromLTRB(
                              AppSpacing.gutterScreen, 8, AppSpacing.gutterScreen, 12),
                          child: Column(crossAxisAlignment: CrossAxisAlignment.stretch, children: _withGaps()),
                        )
                      : Padding(
                          padding: const EdgeInsets.fromLTRB(
                              AppSpacing.gutterScreen, 8, AppSpacing.gutterScreen, 12),
                          child: Column(crossAxisAlignment: CrossAxisAlignment.stretch, children: _withGaps()),
                        ),
                ),
                if (footer != null)
                  Padding(
                    padding: const EdgeInsets.fromLTRB(AppSpacing.gutterScreen, 8, AppSpacing.gutterScreen, 10),
                    child: footer,
                  ),
                if (tabBar != null) tabBar!,
              ],
            ),
          ),
        ],
      ),
    );
  }

  List<Widget> _withGaps() {
    final out = <Widget>[];
    for (var i = 0; i < body.length; i++) {
      out.add(body[i]);
      if (i != body.length - 1) out.add(const SizedBox(height: AppSpacing.gapCard));
    }
    return out;
  }
}
