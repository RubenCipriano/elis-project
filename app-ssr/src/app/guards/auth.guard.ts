import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import {
  CanActivate,
  Router,
  UrlTree,
} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  canActivate(): boolean | UrlTree {
    const isAuthenticated = this.authService.isAuthenticated();

    if (!isAuthenticated) {
      return this.router.parseUrl('/login');
    }

    return true;
  }
}
