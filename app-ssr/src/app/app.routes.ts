import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { AuthGuard } from './guards/auth.guard';
import { ClientOnlyGuard } from './guards/client.guard';

export const routes: Routes = [
    { path: '', component: DashboardPageComponent, canActivate: [AuthGuard]  },
    { path: 'login', component: LoginPageComponent  },
    { path: 'map', canActivate: [ClientOnlyGuard], loadComponent: () => import('./pages/map-page/map-page.component').then(m => m.MapPageComponent)
  }
];
