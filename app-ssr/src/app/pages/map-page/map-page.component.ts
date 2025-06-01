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

@Component({
  selector: 'app-map-page',
  standalone: true,
  imports: [CommonModule, NavbarModule, DriverCardModule, DriverModalComponent],
  templateUrl: './map-page.component.html',
  styleUrls: ['./map-page.component.scss']
})
export class MapPageComponent implements OnInit, AfterViewInit {
  map: any;
  maplibregl: any;
  drivers: Driver[] = [];
  selectedDriver: any = null;
  showRightSidebar = true;
  markers: { [key: string]: any } = {};

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private ngZone: NgZone,
    private driverSocketService: DriverSocketService
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.driverSocketService.drivers$.subscribe(newDrivers => {
        const updatedIds = new Set();

        newDrivers.forEach(driver => {
          updatedIds.add(driver.driverId);

          if (this.markers[driver.driverId]) {
            // Update marker
            const marker = this.markers[driver.driverId];
            marker.setLngLat([driver.position.lng, driver.position.lat]);
          } else {
            // Create new marker
            const el = document.createElement('div');
            el.className = 'driver-marker';

            el.addEventListener('click', () => {
              this.ngZone.run(() => this.focusOnDriver(driver, true));
            });

            const marker = new this.maplibregl.Marker(el)
              .setLngLat([driver.position.lng, driver.position.lat])
              .addTo(this.map);

            this.markers[driver.driverId] = marker;
            this.drivers.push(driver);
          }
        });

        // Clean up removed markers
        this.drivers = this.drivers.filter(driver => {
          const exists = updatedIds.has(driver.driverId);
          if (!exists) {
            this.markers[driver.driverId]?.remove();
            delete this.markers[driver.driverId];
          }
          return exists;
        });
      });
    }
  }

  async ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      const maplibregl = await import('maplibre-gl');
      this.maplibregl = maplibregl.default; // <- aqui

      this.map = new this.maplibregl.Map({
        container: 'map',
        style: '/api/maptiller/streets',
        center: [-9.1399, 38.7169],
        zoom: 14
      });

      this.map.on('load', () => {
        this.map.resize();
      });
    }
  }


  focusOnDriver(driver: any, openModal: boolean = false) {
    if (openModal) this.selectedDriver = driver;

    this.map.flyTo({
      center: [driver.position.lng, driver.position.lat],
      zoom: 18
    });
  }

  onSaveDriver(driver: any) {
    const index = this.drivers.findIndex(d => d.driverId === driver.id);
    if (index !== -1) {
      this.drivers[index] = driver;
    }
    this.selectedDriver = null;
  }
}
