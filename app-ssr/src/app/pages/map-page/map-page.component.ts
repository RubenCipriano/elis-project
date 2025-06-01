import {
  AfterViewInit,
  Component,
  Inject,
  PLATFORM_ID,
  NgZone,
  OnInit
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { NavbarModule } from '../../components/navbar-component/navbar.module';
import { DriverCardModule } from '../../components/driver-card/driver-card.module';
import { DriverModalComponent } from '../../components/driver-modal/driver-modal.component';
import { Driver } from '../../interfaces/driver.interface';
import { DriverSocketService } from '../../services/driver-socket.service';

import type { Map as MapLibreMap, Marker, default as MapLibreGL } from 'maplibre-gl';

@Component({
  selector: 'app-map-page',
  standalone: true,
  imports: [CommonModule, NavbarModule, DriverCardModule, DriverModalComponent],
  templateUrl: './map-page.component.html',
  styleUrls: ['./map-page.component.scss']
})
export class MapPageComponent implements OnInit, AfterViewInit {
  map!: MapLibreMap;
  maplibregl!: typeof MapLibreGL;
  drivers: Driver[] = [];
  selectedDriver: Driver | null = null;
  showRightSidebar = true;
  markers: Record<string, Marker> = {};

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private ngZone: NgZone,
    private driverSocketService: DriverSocketService
  ) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.driverSocketService.drivers$.subscribe(newDrivers => {
      const updatedIds = new Set<string>();
      const newDriversMap = new Map(newDrivers.map(d => [d.driverId, d]));

      // Update markers and drivers list
      const updatedDrivers: Driver[] = [];

      newDrivers.forEach(driver => {
        updatedIds.add(driver.driverId);

        if (this.markers[driver.driverId]) {
          // Update existing marker position
          this.markers[driver.driverId].setLngLat([driver.position.lng, driver.position.lat]);

          // Update driver in drivers array (if exists)
          const existingDriverIndex = this.drivers.findIndex(d => d.driverId === driver.driverId);
          if (existingDriverIndex !== -1) {
            this.drivers[existingDriverIndex] = driver;
          } else {
            this.drivers.push(driver);
          }
        } else {
          // Create new marker
          const popup = new this.maplibregl.Popup()
            .setText(driver.name || 'Unknown Driver');

          const marker = new this.maplibregl.Marker()
            .setLngLat([driver.position.lng, driver.position.lat])
            .setPopup(popup)
            .addTo(this.map);

          popup.on('open', () => {
            this.ngZone.run(() => this.focusOnDriver(driver, true));
          });

          this.markers[driver.driverId] = marker;
          this.drivers.push(driver);
        }

        updatedDrivers.push(driver);
      });

      // Remove markers and drivers not in newDrivers
      this.drivers = this.drivers.filter(driver => {
        const stillExists = updatedIds.has(driver.driverId);
        if (!stillExists) {
          this.markers[driver.driverId]?.remove();
          delete this.markers[driver.driverId];
        }
        return stillExists;
      });

      // Replace the drivers array reference to trigger change detection
      this.drivers = [...updatedDrivers];
    });
  }


  async ngAfterViewInit(): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) return;

    const maplibregl = await import('maplibre-gl');
    this.maplibregl = maplibregl.default;

    this.map = new this.maplibregl.Map({
      container: 'map',
      style: '/api/maptiller/streets',
      center: [-9.1399, 38.7169],
      zoom: 14,
      pitchWithRotate: false,
      dragRotate: false,
      touchPitch: false,
      keyboard: false
    });

    this.map.on('load', () => this.map.resize());
  }

  focusOnDriver(driver: Driver, openModal: boolean = false): void {
    if (openModal) this.selectedDriver = driver;

    this.map.flyTo({
      center: [driver.position.lng, driver.position.lat],
      zoom: 18
    });
  }

  onSaveDriver(updatedDriver: any): void {
    updatedDriver = updatedDriver as Driver;
    
    const index = this.drivers.findIndex(d => d.driverId === updatedDriver.driverId);
    if (index !== -1) {
      this.drivers[index] = updatedDriver;
    }
    this.selectedDriver = null;
  }
}
