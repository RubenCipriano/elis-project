import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';
import { NavbarModule } from "./components/navbar-component/navbar.module";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [CommonModule, RouterOutlet, NavbarModule]
})

export class AppComponent {
  isLogged = false;

  constructor(private authService: AuthService) {
    this.authService.user$.pipe(filter(value => value !== null)).subscribe(() => {
      this.isLogged = this.authService.isAuthenticated();
    });
  }
}

