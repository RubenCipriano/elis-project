import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authUrl = '/api/auth/login';
  private tokenKey = 'auth_token';
  private userSubject = new BehaviorSubject<boolean | null>(null); // Start with null

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      const token = this.getToken();
      this.userSubject.next(!!token); // Only update when we know the token status
    }
  }

  async login(credentials: { email: string; password: string }): Promise<any> {
    try {
      const response = await firstValueFrom(
        this.http.post<{ token: string }>(this.authUrl, credentials)
      );

      if (isPlatformBrowser(this.platformId)) {
        this.storeToken(response.token);
        this.userSubject.next(true);
      }

      return response;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.tokenKey);
      this.userSubject.next(false);
    }
  }

  isAuthenticated(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem(this.tokenKey);
    }
    return false; // On SSR, return false
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(this.tokenKey);
    }
    return null;
  }

  private storeToken(token: string) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.tokenKey, token);
    }
  }

  get user$() {
    return this.userSubject.asObservable();
  }
}
