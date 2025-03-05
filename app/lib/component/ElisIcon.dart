import 'package:flutter/material.dart';

class ElisIcon extends StatelessWidget {
  final Color backgroundColor;
  final Color iconColor;
  final IconData? icon;
  final double size;

  const ElisIcon({
    super.key,
    this.backgroundColor = const Color(0xFF00A5AA),
    this.iconColor = Colors.white,
    this.icon = Icons.check,
    this.size = 40,
  });

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        return Container(
          height: size,
          width: size,
          margin: const EdgeInsets.symmetric(horizontal: 5),
          decoration: BoxDecoration(
            color: backgroundColor,
            shape: BoxShape.circle,
          ),
          child: Icon(
            icon,
            color: iconColor,
            size: size * 0.6, // Mantém proporção do ícone
          ),
        );
      },
    );
  }
}
