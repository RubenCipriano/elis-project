import 'package:elis_courier/component/ElisStatus.dart';
import 'package:flutter/material.dart';

class ServiceCard extends StatelessWidget {
  final String clientId;
  final String clientName;
  final String route;
  final String address;
  final int progress;
  final int total;
  final VoidCallback onTap;
  final bool isDarkMode;

  const ServiceCard({
    super.key,
    required this.clientId,
    required this.clientName,
    required this.route,
    required this.address,
    required this.progress,
    required this.total,
    required this.onTap,
    required this.isDarkMode,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      margin: const EdgeInsets.symmetric(vertical: 8),
      decoration: BoxDecoration(
        color: isDarkMode ? Color(0XFF181818) : Color(0XFFF5F5F5),
        borderRadius: BorderRadius.circular(12),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Column(
            mainAxisAlignment: MainAxisAlignment.start,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                "Cliente #$clientId",
                textAlign: TextAlign.left,
                style: TextStyle(
                  color: isDarkMode ? Colors.white : Colors.black,
                  fontWeight: FontWeight.bold,
                  fontSize: 12,
                ),
              ),
              const SizedBox(height: 5),
              Text(
                clientName,
                style: TextStyle(
                  color: isDarkMode ? Colors.white : Colors.black,
                  fontSize: 11,
                ),
              ),
              Text(
                route,
                style: TextStyle(
                  color: isDarkMode ? Colors.white : Colors.black,
                  fontSize: 11,
                ),
              ),
              Text(
                address,
                style: TextStyle(
                  color: isDarkMode ? Colors.white : Colors.black,
                  fontSize: 11,
                ),
              ),
              const SizedBox(height: 10),
            ],
          ),
          Column(
            children: [
              Row(
                spacing: 5,
                children: [
                  ElisStatus(
                    progress: progress,
                    total: total,
                    isDarkMode: isDarkMode,
                  ),
                  const SizedBox(
                    width: 10,
                  ), // Adding some space between the Container and the GestureDetector
                  GestureDetector(
                    onTap: onTap,
                    child: const CircleAvatar(
                      backgroundColor: Colors.cyan,
                      child: Icon(
                        Icons.arrow_forward,
                        color: Colors.white,
                        size: 20,
                      ),
                    ),
                  ),
                ],
              ),
            ],
          ),
        ],
      ),
    );
  }
}
