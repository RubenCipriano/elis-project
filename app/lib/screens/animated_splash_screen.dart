import 'dart:async';
import 'package:elis_courier/screens/dashboard_screen.dart';
import 'package:flutter/material.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'login_screen.dart';

class AnimatedSplashScreen extends StatefulWidget {
  @override
  _AnimatedSplashScreenState createState() => _AnimatedSplashScreenState();
}

enum Status { INIT, MID, END }

class _AnimatedSplashScreenState extends State<AnimatedSplashScreen> {
  Status stateOfLogo = Status.INIT;
  double logoWidth = 100;

  @override
  void initState() {
    super.initState();
    _startAnimation();
  }

  void _startAnimation() {
    Timer(Duration(seconds: 1), () => setState(() => stateOfLogo = Status.MID));
    Timer(Duration(seconds: 3), () => setState(() => stateOfLogo = Status.END));
    Timer(Duration(seconds: 4), () => _navigateToHome());
  }

  void _navigateToHome() async {
    final _storage = FlutterSecureStorage();

    final token = await _storage.read(key: 'jwt_token');

    if (token == null) {
      Navigator.pushReplacement(
        context,
        MaterialPageRoute(builder: (context) => const LoginPage()),
      );
    } else {
      Navigator.pushReplacement(
        context,
        MaterialPageRoute(builder: (context) => const DashboardScreen()),
      );
    }
  }

  double _getLogoPosition(
    double screenWidth,
    double midScreenWidth,
    double logoWidth,
  ) {
    return {
      Status.INIT: -logoWidth,
      Status.MID: midScreenWidth,
      Status.END: screenWidth,
    }[stateOfLogo]!;
  }

  @override
  Widget build(BuildContext context) {
    bool isDarkMode =
        MediaQuery.of(context).platformBrightness == Brightness.dark;

    double screenWidth = MediaQuery.of(context).size.width;
    double midScreenWidth = screenWidth * 0.5 - 50;

    double logoPosition = _getLogoPosition(
      screenWidth,
      midScreenWidth,
      logoWidth,
    );

    return Scaffold(
      backgroundColor: isDarkMode ? Color(0xFF232323) : Color(0xFFFFFFFF),
      body: Center(
        child: Stack(
          children: [
            AnimatedPositioned(
              duration: Duration(seconds: 1),
              curve: Curves.easeOut,
              left: logoPosition,
              top: MediaQuery.of(context).size.height * 0.4,
              child: Image.asset('assets/logo.png', width: logoWidth),
            ),
          ],
        ),
      ),
    );
  }
}
