import { Injectable, Inject, PLATFORM_ID, Optional, REQUEST } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { Request } from 'express';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authUrl = '/api/auth/login';
  private tokenKey = 'auth_token';
  private userSubject = new BehaviorSubject<boolean | null>(null);

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Optional() @Inject(REQUEST) private request: Request // for SSR only
  ) {
    const token = this.getToken();
    this.userSubject.next(!!token);
  }

  // --- LOGIN ---
  async login(credentials: { email: string; password: string }): Promise<any> {
    try {
      const response = await firstValueFrom(
        this.http.post<{ token: string }>(this.authUrl, credentials)
      );

      if (isPlatformBrowser(this.platformId)) {
        this.setCookie(this.tokenKey, response.token, 1); // 1 day
      }

      this.userSubject.next(true);
      return response;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }

  // --- LOGOUT ---
  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.deleteCookie(this.tokenKey);
    }

    this.userSubject.next(false);
  }

  // --- IS AUTHENTICATED ---
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  // --- GET TOKEN ---
  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return this.getCookie(this.tokenKey);
    }

    console.log(this.request.header("cookie"))
    console.log(this.request.rawHeaders)

    // SSR - read from request cookie header
    if (this.request?.headers?.cookie) {
      const cookies = this.request.headers.cookie.split(';');
      const tokenCookie = cookies.find(c => c.trim().startsWith(`${this.tokenKey}=`));
      if (tokenCookie) {
        return tokenCookie.split('=')[1];
      }
    }

    return null;
  }

  // --- Cookie Utils (Browser Only) ---
  private setCookie(name: string, value: string, days: number): void {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=Lax`;
  }

  private getCookie(name: string): string | null {
    const nameEQ = name + '=';
    const ca = document.cookie.split(';');
    for (const c of ca) {
      let trimmed = c.trim();
      if (trimmed.startsWith(nameEQ)) {
        return trimmed.substring(nameEQ.length);
      }
    }
    return null;
  }

  private deleteCookie(name: string): void {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }

  // --- Observable for User State ---
  get user$() {
    return this.userSubject.asObservable();
  }
}
