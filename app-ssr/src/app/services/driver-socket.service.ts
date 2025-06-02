// driver-socket.service.ts
import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { BehaviorSubject } from 'rxjs';
import { Driver } from '../interfaces/driver.interface';

@Injectable({
  providedIn: 'root'
})
export class DriverSocketService {
  private socket: Socket;
  private driversSubject = new BehaviorSubject<Driver[]>([]);
  public drivers$ = this.driversSubject.asObservable();

  constructor() {
    this.socket = io('/'); // replace with your real endpoint

    // Register as dashboard
    this.socket.emit('register', 'dashboard');

    // Listen to real-time driver updates
    this.socket.on('dashboard:drivers', (drivers: Driver[]) => {
      this.driversSubject.next(drivers);
    });

    // Optional: handle individual driver fetch
    this.socket.on('dashboard:driver', (driver: Driver) => {
      console.log('Single driver data:', driver);
    });

    this.socket.on('dashboard:driverNotFound', ({ driverId }) => {
      console.warn(`Driver ${driverId} not found.`);
    });
  }

  requestSingleDriver(driverId: string | number) {
    this.socket.emit('dashboard:get-driver', driverId);
  }

  // Optional: cleanup if needed
  disconnect() {
    this.socket.disconnect();
  }
}
