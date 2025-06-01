import 'dart:async';
import 'package:flutter/material.dart';
import 'package:flutter_background_service/flutter_background_service.dart';
import 'package:geolocator/geolocator.dart';
import 'package:socket_io_client/socket_io_client.dart' as IO;
import 'package:flutter/foundation.dart';
import 'package:meta/meta.dart';

@pragma('vm:entry-point')
class LocationService {
  static IO.Socket? _socket;

  static Future<void> initializeService() async {
    final service = FlutterBackgroundService();

    await service.configure(
      androidConfiguration: AndroidConfiguration(
        onStart: onStart,
        isForegroundMode: true,
        autoStart: true,
        notificationChannelId: 'location_foreground',
        initialNotificationTitle: 'Courier App',
        initialNotificationContent: 'A enviar localização em segundo plano',
        foregroundServiceNotificationId: 888,
        foregroundServiceTypes: [AndroidForegroundType.location],
      ),
      iosConfiguration: IosConfiguration(
        autoStart: true,
        onForeground: onStart,
      ),
    );

    await service.startService();
  }

  @pragma('vm:entry-point')
  static Future<void> onStart(ServiceInstance service) async {
    WidgetsFlutterBinding.ensureInitialized();

    // Request permissions
    final hasPermission = await _ensureLocationPermission();
    if (!hasPermission) return;

    _initializeSocket();

    Timer.periodic(const Duration(seconds: 5), (timer) async {
      try {
        final pos = await Geolocator.getCurrentPosition();
        _socket?.emit('driver:update-data', {
          "driverId": "D123",
          "position": {"lat": pos.latitude, "lng": pos.longitude},
          "status": "onRoute",
          "vehicle": "Peugeot Partner",
          "name": "Pedro Santos",
          "route": "Lisboa-Centro",
          "totalServices": 10,
          "servicesCompleted": 2,
          "timestamp": DateTime.now().millisecondsSinceEpoch,
        });

        if (kDebugMode) {
          print("Location sent: ${pos.latitude}, ${pos.longitude}");
        }
      } catch (e) {
        if (kDebugMode) {
          print("Error getting location: $e");
        }
      }
    });
  }

  static void _initializeSocket() {
    _socket = IO.io(
      'http://192.168.1.129:4000',
      IO.OptionBuilder()
          .setTransports(['websocket'])
          .disableAutoConnect()
          .build(),
    );
    _socket!.connect();
    _socket!.onConnect((_) {
      if (kDebugMode) print('Socket connected');
      _socket!.emit("register", "driver");
      print("Socket registered as driver");
    });
  }

  static Future<bool> _ensureLocationPermission() async {
    bool serviceEnabled = await Geolocator.isLocationServiceEnabled();
    if (!serviceEnabled) return false;

    LocationPermission permission = await Geolocator.checkPermission();
    if (permission == LocationPermission.denied) {
      permission = await Geolocator.requestPermission();
    }

    return permission == LocationPermission.always ||
        permission == LocationPermission.whileInUse;
  }
}
