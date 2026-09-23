import 'dart:math' as math;
import 'package:flutter/material.dart';
import '../theme/tokens.dart';

/// Porta de components/data/Badge.jsx (conquistas)
class UpBadge extends StatelessWidget {
  const UpBadge({super.key, required this.icon, this.label, this.sublabel, this.size = 96, this.locked = false});
  final String icon;
  final String? label;
  final String? sublabel;
  final double size;
  final bool locked;

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        Container(
          width: size,
          height: size,
          alignment: Alignment.center,
          decoration: BoxDecoration(
            shape: BoxShape.circle,
            gradient: locked ? null : AppColors.gradOrb,
            color: locked ? AppColors.ink700 : null,
            boxShadow: locked ? null : AppGlow.brandLg,
          ),
          child: locked
              ? ColorFiltered(
                  colorFilter: const ColorFilter.matrix(<double>[
                    0.2126, 0.7152, 0.0722, 0, 0,
                    0.2126, 0.7152, 0.0722, 0, 0,
                    0.2126, 0.7152, 0.0722, 0, 0,
                    0, 0, 0, 1, 0,
                  ]),
                  child: Text(icon, style: TextStyle(fontSize: size * 0.36)),
                )
              : Text(icon, style: TextStyle(fontSize: size * 0.36)),
        ),
        if (label != null) ...[
          const SizedBox(height: 8),
          Text(label!, style: AppText.body.copyWith(fontWeight: FontWeight.w700, color: locked ? AppColors.textMuted : AppColors.textPrimary)),
        ],
        if (sublabel != null)
          Text(sublabel!, style: AppText.label.copyWith(color: AppColors.textMuted)),
      ],
    );
  }
}

class UpBarChartPoint {
  const UpBarChartPoint({required this.label, required this.value, this.active = false});
  final String label;
  final double value;
  final bool active;
}

/// Porta de components/data/BarChart.jsx
class UpBarChart extends StatelessWidget {
  const UpBarChart({super.key, required this.data, this.height = 160, this.max});
  final List<UpBarChartPoint> data;
  final double height;
  final double? max;

  @override
  Widget build(BuildContext context) {
    final top = max ?? data.map((d) => d.value).fold<double>(1, math.max);
    return SizedBox(
      height: height,
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.end,
        children: data.map((d) {
          final h = math.max(6.0, (d.value / top) * (height - 24));
          return Expanded(
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 4),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.end,
                children: [
                  AnimatedContainer(
                    duration: AppMotion.slow,
                    curve: AppMotion.easeOut,
                    height: h,
                    constraints: const BoxConstraints(maxWidth: 18),
                    decoration: BoxDecoration(
                      gradient: d.active ? AppColors.gradBrand : null,
                      color: d.active ? null : AppColors.ink600,
                      borderRadius: BorderRadius.circular(AppRadius.pill),
                      boxShadow: d.active ? AppGlow.brandSm : null,
                    ),
                  ),
                  const SizedBox(height: 6),
                  Text(d.label, style: AppText.caption.copyWith(color: AppColors.textMuted)),
                ],
              ),
            ),
          );
        }).toList(),
      ),
    );
  }
}

/// Porta de components/data/ProgressBar.jsx
class UpProgressBar extends StatelessWidget {
  const UpProgressBar({super.key, required this.value, this.height = 6, this.knob = false});
  final double value; // 0-100
  final double height;
  final bool knob;

  @override
  Widget build(BuildContext context) {
    final pct = value.clamp(0, 100) / 100;
    return LayoutBuilder(builder: (context, constraints) {
      final w = constraints.maxWidth;
      return SizedBox(
        height: knob ? height + 8 : height,
        child: Stack(
          clipBehavior: Clip.none,
          children: [
            Container(
              height: height,
              margin: EdgeInsets.only(top: knob ? 4 : 0),
              decoration: BoxDecoration(color: Colors.white.withOpacity(0.12), borderRadius: BorderRadius.circular(AppRadius.pill)),
            ),
            AnimatedContainer(
              duration: AppMotion.slow,
              curve: AppMotion.easeOut,
              height: height,
              width: w * pct,
              margin: EdgeInsets.only(top: knob ? 4 : 0),
              decoration: BoxDecoration(gradient: AppColors.gradBrand, borderRadius: BorderRadius.circular(AppRadius.pill)),
            ),
            if (knob)
              Positioned(
                left: (w * pct - (height + 6) / 2).clamp(0.0, w).toDouble(),
                top: 0,
                child: Container(
                  width: height + 6,
                  height: height + 6,
                  decoration: BoxDecoration(color: AppColors.lime300, shape: BoxShape.circle, boxShadow: AppGlow.brandSm),
                ),
              ),
          ],
        ),
      );
    });
  }
}

/// Porta de components/data/ProgressRing.jsx
class UpProgressRing extends StatelessWidget {
  const UpProgressRing({super.key, required this.value, this.size = 120, this.thickness = 10, this.child});
  final double value; // 0-100
  final double size;
  final double thickness;
  final Widget? child;

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: size,
      height: size,
      child: Stack(
        alignment: Alignment.center,
        children: [
          CustomPaint(
            size: Size(size, size),
            painter: _RingPainter(value: value.clamp(0, 100) / 100, thickness: thickness),
          ),
          if (child != null) child!,
        ],
      ),
    );
  }
}

class _RingPainter extends CustomPainter {
  _RingPainter({required this.value, required this.thickness});
  final double value;
  final double thickness;

  @override
  void paint(Canvas canvas, Size size) {
    final center = Offset(size.width / 2, size.height / 2);
    final r = (size.shortestSide - thickness) / 2;
    final track = Paint()
      ..color = Colors.white.withOpacity(0.10)
      ..style = PaintingStyle.stroke
      ..strokeWidth = thickness;
    canvas.drawCircle(center, r, track);

    final rect = Rect.fromCircle(center: center, radius: r);
    final sweep = Paint()
      ..shader = const SweepGradient(
        startAngle: 0,
        endAngle: math.pi * 2,
        colors: [AppColors.cyan400, AppColors.spring400, AppColors.lime300],
      ).createShader(rect)
      ..style = PaintingStyle.stroke
      ..strokeWidth = thickness
      ..strokeCap = StrokeCap.round;
    canvas.drawArc(rect, -math.pi / 2, math.pi * 2 * value, false, sweep);
  }

  @override
  bool shouldRepaint(covariant _RingPainter oldDelegate) => oldDelegate.value != value;
}

enum UpStatTone { normal, brand, heat, cyan }

/// Porta de components/data/StatTile.jsx
class UpStatTile extends StatelessWidget {
  const UpStatTile({super.key, this.icon, required this.value, required this.label, this.tone = UpStatTone.normal});
  final Widget? icon;
  final String value;
  final String label;
  final UpStatTone tone;

  Color get _color => switch (tone) {
        UpStatTone.normal => AppColors.textPrimary,
        UpStatTone.brand => AppColors.lime300,
        UpStatTone.heat => AppColors.heat500,
        UpStatTone.cyan => AppColors.cyan400,
      };

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        if (icon != null) IconTheme(data: IconThemeData(color: _color, size: 18), child: icon!),
        if (icon != null) const SizedBox(height: 2),
        Text(value, style: AppText.title3.copyWith(color: _color, fontWeight: FontWeight.w700)),
        Text(label, style: AppText.label.copyWith(color: AppColors.textMuted)),
      ],
    );
  }
}

/// Porta de components/data/StreakMeter.jsx
class UpStreakMeter extends StatelessWidget {
  const UpStreakMeter({super.key, required this.days, this.goal = 7, this.label = 'dias seguidos'});
  final int days;
  final int goal;
  final String label;

  @override
  Widget build(BuildContext context) {
    final pct = (days / goal).clamp(0, 1).toDouble();
    return Row(
      children: [
        Container(
          width: 44,
          height: 44,
          alignment: Alignment.center,
          decoration: BoxDecoration(shape: BoxShape.circle, boxShadow: AppGlow.heat),
          child: const Text('🔥', style: TextStyle(fontSize: 20)),
        ),
        const SizedBox(width: 12),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text('$days $label', style: AppText.body.copyWith(fontWeight: FontWeight.w700, color: AppColors.textPrimary)),
                  Text('$days/$goal', style: AppText.label.copyWith(color: AppColors.textMuted)),
                ],
              ),
              const SizedBox(height: 6),
              ClipRRect(
                borderRadius: BorderRadius.circular(AppRadius.pill),
                child: LinearProgressIndicator(
                  value: pct,
                  minHeight: 6,
                  backgroundColor: Colors.white.withOpacity(0.12),
                  valueColor: const AlwaysStoppedAnimation(AppColors.lime300),
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }
}
