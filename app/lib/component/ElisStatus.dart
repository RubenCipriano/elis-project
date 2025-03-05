import 'package:flutter/material.dart';

class ElisStatus extends StatelessWidget {
  final bool isDarkMode;
  final int progress;
  final int total;

  const ElisStatus({
    super.key,
    required this.progress,
    required this.total,
    required this.isDarkMode,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
      decoration: BoxDecoration(
        color: isDarkMode ? Colors.black : Color(0xFFD8D8D8),
        borderRadius: BorderRadius.circular(8),
      ),
      child: Text(
        "$progress/$total",
        style: TextStyle(
          color: isDarkMode ? Colors.white : Colors.black,
          fontSize: 10,
        ),
      ),
    );
  }
}
