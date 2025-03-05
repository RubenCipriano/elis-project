import 'package:elis_courier/component/ElisCard.dart';
import 'package:elis_courier/component/ElisNavbar.dart';
import 'package:elis_courier/component/ElisServiceCard.dart';
import 'package:elis_courier/component/ElisStatus.dart';
import 'package:elis_courier/models/ClientModel.dart';
import 'package:elis_courier/screens/client_screen.dart';
import 'package:flutter/material.dart';

const services = [
  Clientmodel(),
  Clientmodel(),
  Clientmodel(),
  Clientmodel(),
  Clientmodel(),
];

class DashboardScreen extends StatelessWidget {
  const DashboardScreen({super.key});

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
              Navbar(label: "DASHBOARD", isDarkMode: isDarkMode),

              const SizedBox(height: 30),

              Row(
                children: [
                  Expanded(
                    child: SingleChildScrollView(
                      scrollDirection: Axis.horizontal,
                      child: Row(
                        spacing: 5,
                        children: [
                          DashboardCard(
                            title: "Simulação",
                            imagePath: "assets/logo.png",
                            onTap: () => print("Simulação"),
                            isDarkMode: isDarkMode,
                          ),
                          DashboardCard(
                            title: "Contrato",
                            imagePath: "assets/logo.png",
                            onTap: () => print("Contrato"),
                            isDarkMode: isDarkMode,
                          ),
                          DashboardCard(
                            title: "Clientes",
                            imagePath: "assets/logo.png",
                            onTap: () => print("Clientes"),
                            isDarkMode: isDarkMode,
                          ),
                          DashboardCard(
                            title: "Simulação",
                            imagePath: "assets/logo.png",
                            onTap: () => print("Simulação"),
                            isDarkMode: isDarkMode,
                          ),
                          DashboardCard(
                            title: "Contrato",
                            imagePath: "assets/logo.png",
                            onTap: () => print("Contrato"),
                            isDarkMode: isDarkMode,
                          ),
                          DashboardCard(
                            title: "Clientes",
                            imagePath: "assets/logo.png",
                            onTap: () => print("Clientes"),
                            isDarkMode: isDarkMode,
                          ),
                          DashboardCard(
                            title: "Simulação",
                            imagePath: "assets/logo.png",
                            onTap: () => print("Simulação"),
                            isDarkMode: isDarkMode,
                          ),
                          DashboardCard(
                            title: "Contrato",
                            imagePath: "assets/logo.png",
                            onTap: () => print("Contrato"),
                            isDarkMode: isDarkMode,
                          ),
                          DashboardCard(
                            title: "Clientes",
                            imagePath: "assets/logo.png",
                            onTap: () => print("Clientes"),
                            isDarkMode: isDarkMode,
                          ),
                          DashboardCard(
                            title: "Simulação",
                            imagePath: "assets/logo.png",
                            onTap: () => print("Simulação"),
                            isDarkMode: isDarkMode,
                          ),
                          DashboardCard(
                            title: "Contrato",
                            imagePath: "assets/logo.png",
                            onTap: () => print("Contrato"),
                            isDarkMode: isDarkMode,
                          ),
                          DashboardCard(
                            title: "Clientes",
                            imagePath: "assets/logo.png",
                            onTap: () => print("Clientes"),
                            isDarkMode: isDarkMode,
                          ),
                        ],
                      ),
                    ),
                  ),
                ],
              ),

              const SizedBox(height: 30),

              Row(
                spacing: 10,
                children: [
                  Text(
                    "Serviços em execução",
                    style: TextStyle(
                      color: isDarkMode ? Colors.white : Colors.black,
                      fontWeight: FontWeight.bold,
                      fontSize: 14,
                    ),
                  ),
                  ElisStatus(
                    progress: 0,
                    total: services.length,
                    isDarkMode: isDarkMode,
                  ),
                ],
              ),

              const SizedBox(height: 10),

              // Wrap the service cards in SingleChildScrollView for vertical scrolling
              Expanded(
                child: SingleChildScrollView(
                  child: Column(
                    children:
                        services
                            .map(
                              (service) => ServiceCard(
                                clientId: service.Id.toString(),
                                clientName: service.Name,
                                route: service.Route,
                                address: service.Address,
                                progress: 0,
                                total: 10,
                                onTap: () {
                                  Navigator.pushReplacement(
                                    context,
                                    MaterialPageRoute(
                                      builder:
                                          (context) => ClientScreen(
                                            clientId: "Cliente #${service.Id}",
                                          ),
                                    ),
                                  );
                                },
                                isDarkMode: isDarkMode,
                              ),
                            )
                            .toList(),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
