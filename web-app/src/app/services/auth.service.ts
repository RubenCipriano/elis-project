import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authUrl = 'http://5.249.164.180:5000/api/auth/login'; // Adjust backend URL
  private tokenKey = 'auth_token';
  private userSubject = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: object // Detect platform (browser or server)
  ) {
    // Only check authentication if running in the browser
    if (isPlatformBrowser(this.platformId)) {
      this.userSubject.next(this.isAuthenticated());
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

      return response; // Return response if needed
    } catch (error) {
      console.error('Login failed:', error);
      throw error; // Rethrow the error to be handled by the caller
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
    return false; // If running on the server, return false
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
