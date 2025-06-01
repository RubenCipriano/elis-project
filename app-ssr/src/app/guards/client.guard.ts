import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class ClientOnlyGuard implements CanActivate {
  constructor(@Inject(PLATFORM_ID) private platformId: Object, private router: Router) {}

  canActivate(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return true;
    } else {
      // Optional: Redirect or just block
      console.warn('Blocked map route from server-side rendering.');
      return true;
    }
  }
}
