import 'package:flutter/material.dart';

class ElisInputField extends StatelessWidget {
  final String label;
  final bool isDarkMode;
  final bool obscureText;
  final TextEditingController? controller;

  const ElisInputField({
    super.key,
    required this.label,
    required this.isDarkMode,
    this.obscureText = false,
    this.controller,
  });

  @override
  Widget build(BuildContext context) {
    return TextField(
      controller: controller,
      obscureText: obscureText,
      decoration: InputDecoration(
        labelText: label,
        labelStyle: TextStyle(color: isDarkMode ? Colors.white : Colors.black),
        filled: true,
        fillColor:
            isDarkMode
                ? Color(0XFF181818)
                : Color(0XFFEDEDED), // Background color
        border: InputBorder.none, // Remove the border
        enabledBorder: InputBorder.none, // Remove border when enabled
        focusedBorder: InputBorder.none, // Remove border when focused
      ),
      style: TextStyle(color: isDarkMode ? Colors.white : Colors.black),
    );
  }
}
