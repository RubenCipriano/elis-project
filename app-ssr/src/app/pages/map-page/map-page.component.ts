import {
  AfterViewInit,
  Component,
  Inject,
  PLATFORM_ID,
  NgZone,
  OnInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarModule } from '../../components/navbar-component/navbar.module';
import { DriverCardModule } from '../../components/driver-card/driver-card.module';
import { DriverModalComponent } from '../../components/driver-modal/driver-modal.component';
import * as L from 'leaflet';
import { Driver } from '../../interfaces/driver.interface';
import { DriverSocketService } from '../../services/driver-socket.service';

@Component({
  selector: 'app-map-page',
  standalone: true,
  imports: [CommonModule, NavbarModule, DriverCardModule, DriverModalComponent],
  templateUrl: './map-page.component.html',
  styleUrls: ['./map-page.component.scss']
})
export class MapPageComponent implements OnInit, AfterViewInit {
  map: any;

  drivers: Driver[] = [];

  selectedDriver: any = null;

  showRightSidebar = true;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private ngZone: NgZone, private driverSocketService: DriverSocketService) {}

  ngOnInit(): void {
    this.driverSocketService.drivers$.subscribe(newDrivers => {
      console.log(newDrivers)
      const updatedDriverIds = new Set();

      newDrivers.forEach(newDriver => {
        updatedDriverIds.add(newDriver.driverId);

        const existing = this.drivers.find(d => d.driverId === newDriver.driverId);

        if (existing) {
          // Update existing fields
          Object.assign(existing, newDriver);

          // Update marker position
          if (existing.marker) {
            existing.marker.setLatLng([newDriver.position.lat, newDriver.position.lng]);
          }
        } else {
          // New driver, add to list and create marker
          const circle = L.circleMarker([newDriver.position.lat, newDriver.position.lng], {
            radius: 8,
            fillColor: '#00BCD4',
            color: '#007C91',
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8
          }).addTo(this.map);

          newDriver.marker = circle;

          circle.on('click', () => {
            this.ngZone.run(() => this.focusOnDriver(newDriver, true));
          });

          this.drivers.push(newDriver);
        }
      });

      // Optional: Remove drivers that no longer exist
      this.drivers = this.drivers.filter(driver => {
        const stillExists = updatedDriverIds.has(driver.driverId);
        if (!stillExists && driver.marker) {
          this.map.removeLayer(driver.marker); // Clean up marker
        }
        return stillExists;
      });
    });
  }

  
  focusOnDriver(driver: any, openModal: boolean = false) {
    if (openModal) {
      this.selectedDriver = driver;

      console.log(this.selectedDriver)
    }

    // Reset all markers
    this.drivers.forEach(d => {
      if(d.marker)
        d.marker.setStyle({
          radius: 8,
          fillColor: '#00BCD4',
          color: '#007C91'
        });
    });

    // Highlight selected marker
    driver.marker.setStyle({
      radius: 12,
      fillColor: '#FF5722', // Highlight color
      color: '#E64A19'
    });

    this.map.setView([driver.position.lat, driver.position.lng], 20);
  }

  onSaveDriver(driver: any) {
    
    const index = this.drivers.findIndex(d => d.driverId === driver.id);
    if (index !== -1) {
      this.drivers[index] = driver;
    }

    this.selectedDriver = null;
  }

  ngAfterViewInit(): void {
    this.map = L.map('map', {
      center: [38.7169, -9.1399],
      zoom: 14
    });

    L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png', {
      maxZoom: 20,
      attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>'
    }).addTo(this.map);

    // Important: wait for map to fully load, then trigger resize
    setTimeout(() => {
      this.map.invalidateSize();
    }, 0);
  }
}
