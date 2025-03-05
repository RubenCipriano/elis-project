import 'package:flutter/material.dart';

class ElisSignButton extends StatelessWidget {
  final String text;
  final GestureTapCallback? onPressed;
  final bool isDarkMode;
  const ElisSignButton({
    super.key,
    required this.isDarkMode,
    required this.text,
    this.onPressed,
  });

  @override
  Widget build(BuildContext context) {
    double screenWidth = MediaQuery.of(context).size.width;

    return GestureDetector(
      onTap: onPressed,
      child: Container(
        width: screenWidth,
        padding: EdgeInsets.all(20),
        margin: EdgeInsets.all(20),
        decoration: BoxDecoration(
          color: Colors.transparent,
          borderRadius: BorderRadius.circular(8),
          border: Border.all(color: Colors.black, width: 2),
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          spacing: 10,
          children: [
            Text(
              text,
              style: TextStyle(
                color: isDarkMode ? Colors.white : Colors.black,
                fontSize: 12,
              ),
            ),
            SizedBox(width: 8), // Add spacing between text and image
            Image.asset('assets/logo.png', height: 20),
          ],
        ),
      ),
    );
  }
}
