import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LeafletService {
  private leafletPromise: Promise<any> | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  async getLeaflet(): Promise<any> {
    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }

    if (!this.leafletPromise) {
      this.leafletPromise = this.loadLeaflet();
    }

    return this.leafletPromise;
  }

  private async loadLeaflet(): Promise<any> {
    try {
      const leafletModule = await import('leaflet');
      const L = leafletModule.default || leafletModule;
      
      // Fix for default markers not showing up
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'assets/leaflet/marker-icon-2x.png',
        iconUrl: 'assets/leaflet/marker-icon.png',
        shadowUrl: 'assets/leaflet/marker-shadow.png',
      });

      return L;
    } catch (error) {
      console.error('Failed to load Leaflet:', error);
      return null;
    }
  }
}