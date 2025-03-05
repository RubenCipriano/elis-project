import 'package:elis_courier/component/ElisNavbar.dart';
import 'package:elis_courier/component/ElisSignButton.dart';
import 'package:elis_courier/screens/dashboard_screen.dart';
import 'package:flutter/material.dart';
import 'package:signature/signature.dart'; // Pacote de assinatura

// Tela de Assinatura
class SignatureScreen extends StatefulWidget {
  const SignatureScreen({Key? key}) : super(key: key);

  @override
  _SignatureScreenState createState() => _SignatureScreenState();
}

class _SignatureScreenState extends State<SignatureScreen> {
  late SignatureController _controller;

  @override
  void initState() {
    super.initState();
    _controller = SignatureController(
      penColor: Colors.black, // Cor da caneta
      penStrokeWidth: 5.0, // Largura do traço
      exportBackgroundColor: Colors.white,
    );
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

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
              // Navbar
              Navbar(label: "Assinatura", isDarkMode: isDarkMode),
              const SizedBox(height: 30),

              // Título da tela
              Text(
                "Por favor, assine abaixo:",
                style: TextStyle(
                  color: isDarkMode ? Colors.white : Colors.black,
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                ),
              ),
              const SizedBox(height: 20),

              // Área de assinatura
              Signature(
                controller: _controller,
                height: 400,
                backgroundColor: isDarkMode ? Colors.white : Colors.black,
              ),
              const SizedBox(height: 20),

              // Botão para confirmar a assinatura
              ElisSignButton(
                isDarkMode: isDarkMode,
                text: "Confirmar Assinatura",
                onPressed: () {
                  if (_controller.isNotEmpty) {
                    Navigator.pushReplacement(
                      context,
                      MaterialPageRoute(
                        builder: (context) => const DashboardScreen(),
                      ),
                    );
                  }
                },
              ),
            ],
          ),
        ),
      ),
    );
  }
}
