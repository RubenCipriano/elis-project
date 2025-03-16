import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { AuthGuard } from './guards/auth.guard';
import { RedirectGuard } from './guards/redirect.guard';

export const routes: Routes = [
  { path: '', component: LoginPageComponent  },
  { path: 'login', component: LoginPageComponent  },
  { path: 'dashboard', component: DashboardPageComponent }
];
