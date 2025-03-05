import 'package:elis_courier/component/ElisNavbar.dart';
import 'package:elis_courier/component/ElisSignButton.dart';
import 'package:elis_courier/screens/signature_screen.dart';
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
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Navbar(label: clientId, isDarkMode: isDarkMode),
              // Add other content here
            ],
          ),
        ),
      ),
      // Add Positioned widget outside of the Column widget
      bottomNavigationBar: Positioned(
        bottom: 0,
        left: 0,
        right: 0,
        child: ElisSignButton(
          isDarkMode: isDarkMode,
          text: "Assinatura cliente",
          onPressed: () {
            Navigator.pushReplacement(
              context,
              MaterialPageRoute(builder: (context) => SignatureScreen()),
            );
          },
        ),
      ),
    );
  }
}
