import 'package:elis_courier/component/ElisIcon.dart';
import 'package:elis_courier/component/ElisInputField.dart';
import 'package:elis_courier/modules/requests.dart';
import 'package:elis_courier/screens/dashboard_screen.dart';
import 'package:flutter/material.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

TextEditingController emailController = new TextEditingController();
TextEditingController passwordController = new TextEditingController();

class LoginPage extends StatefulWidget {
  const LoginPage({super.key});

  @override
  _LoginPageState createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final _storage = FlutterSecureStorage();

  bool isSuccess = false;
  bool loginClicked = false;
  double circlePosition = -1; // Começa na esquerda

  void _handleLogin() async {
    // Get the email and password from the controllers
    final email = emailController.text;
    final password = passwordController.text;

    if (isSuccess || loginClicked || email.isEmpty || password.isEmpty) return;

    setState(() {
      loginClicked = true;
    });

    final response = await Requests.post(
      "http://5.249.164.180:5000/api/auth/login",
      {"email": email, "password": password},
      null,
    );

    print(response);

    await Future.delayed(const Duration(seconds: 1)); // Simula o login

    if (response != null) {
      setState(() {
        isSuccess = true;
        circlePosition = 1; // Move para a direita (sucesso)
      });

      final token =
          response['token']; // Supondo que o token esteja no campo 'token' da resposta
      await _storage.write(key: 'jwt_token', value: token); // Salva o token

      Navigator.pushReplacement(
        context,
        MaterialPageRoute(builder: (context) => const DashboardScreen()),
      );
    } else {
      setState(() {
        isSuccess = false;
        loginClicked = false;
        circlePosition = -1; // Move para a direita (sucesso)
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    bool isDarkMode =
        MediaQuery.of(context).platformBrightness == Brightness.dark;

    return Scaffold(
      backgroundColor: isDarkMode ? Color(0xFF232323) : Colors.white,
      body: Center(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 30),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Image.asset('assets/logo.png', height: 80),

              const SizedBox(height: 40),

              ElisInputField(
                label: "Email/Username",
                isDarkMode: isDarkMode,
                obscureText: false,
                controller: emailController,
              ),

              const SizedBox(height: 20),

              ElisInputField(
                label: "Password",
                isDarkMode: isDarkMode,
                obscureText: true,
                controller: passwordController,
              ),

              const SizedBox(height: 30),

              GestureDetector(
                onTap: _handleLogin,
                child: Stack(
                  alignment: Alignment.center,
                  children: [
                    Container(
                      height: 50,
                      width: double.infinity,
                      decoration: BoxDecoration(
                        color: Color(0xFF00C5CB),
                        borderRadius: BorderRadius.circular(30),
                      ),
                    ),
                    !loginClicked
                        ? const Text(
                          "LOGIN",
                          textAlign: TextAlign.center,
                          style: TextStyle(
                            color: Colors.white,
                            fontWeight: FontWeight.w600,
                          ),
                        )
                        : AnimatedAlign(
                          duration: const Duration(seconds: 1),
                          curve: Curves.easeOut,
                          alignment: Alignment(circlePosition, 10),
                          child: ElisIcon(icon: isSuccess ? Icons.check : null),
                        ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
