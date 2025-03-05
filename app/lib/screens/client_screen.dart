import 'package:elis_courier/component/ElisNavbar.dart';
import 'package:elis_courier/component/ElisSignButton.dart';
import 'package:flutter/material.dart';

class ClientScreen extends StatelessWidget {
  final String clientId;
  const ClientScreen({super.key, required this.clientId});

  @override
  Widget build(BuildContext context) {
    bool isDarkMode =
        MediaQuery.of(context).platformBrightness == Brightness.dark;

    return Scaffold(
      backgroundColor: isDarkMode ? Color(0xFF232323) : Color(0xFFFFFFFF),
      body: Stack(
        children: [
          Column(
            children: [
              Navbar(label: clientId, isDarkMode: isDarkMode),
              // Add other content here
            ],
          ),
          Positioned(
            bottom: 0,
            left: 0,
            right: 0,
            child: ElisSignButton(
              isDarkMode: isDarkMode,
              text: "Assinatura cliente",
            ),
          ),
        ],
      ),
    );
  }
}
