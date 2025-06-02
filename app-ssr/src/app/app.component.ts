import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';

import { NavbarModule } from "./components/navbar-component/navbar.module";
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [RouterOutlet, NavbarModule]
})

export class AppComponent {
  isLogged = false;

  constructor(private authService: AuthService, @Inject(PLATFORM_ID) private platformId: Object) {

    this.authService.user$.subscribe((isLogged: boolean | null) => {
      this.isLogged = isLogged || false;
    });
    
  }
}

