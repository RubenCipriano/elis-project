import { Driver } from "../models/driverModel";
import { Server, Socket } from 'socket.io';

export const driverMap = new Map<Socket, Driver>();
const dashboardSockets = new Set<Socket>();

export function setupDriverSockets(io: Server) {
  io.on('connection', (socket: Socket) => {
    console.log("Socket connected:", socket.id);

    // Identify socket role
    socket.on('register', (role: 'driver' | 'dashboard') => {
        console.log("Socket role registered:", role);
        if (role === 'driver') {
          driverMap.set(socket, {});
          console.log("Registered DRIVER:", socket.id);
        } else if (role === 'dashboard') {
          dashboardSockets.add(socket);
          console.log("Registered DASHBOARD:", socket.id);

          // Immediately push initial data to dashboard
          const allDrivers = Array.from(driverMap.values());
          socket.emit('dashboard:drivers', allDrivers);
        }
    });

    // Driver updates their data
    socket.on('driver:update-data', (data: Driver) => {
      console.log("Driver update:", socket.id);
      driverMap.set(socket, data);

      // Push updated driver list to all dashboards in real-time
      const allDrivers = Array.from(driverMap.values());
      dashboardSockets.forEach(dash => dash.emit('dashboard:drivers', allDrivers));
    });

    // Dashboard requests a specific driver
    socket.on('dashboard:get-driver', (driverId: string) => {
      console.log("Dashboard requested driver:", driverId);

      const foundDriver = Array.from(driverMap.values()).find(
        driver => driver.driverId === driverId
      );

      if (foundDriver) {
        socket.emit('dashboard:driver', foundDriver);
      } else {
        socket.emit('dashboard:driverNotFound', { driverId });
      }
    });

    socket.on('disconnect', () => {
      console.log("Disconnected:", socket.id);
      driverMap.delete(socket);
      dashboardSockets.delete(socket);
    });
  });
}
