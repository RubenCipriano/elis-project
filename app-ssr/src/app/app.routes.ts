import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { AuthGuard } from './guards/auth.guard';
import { MapPageComponent } from './pages/map-page/map-page.component';

export const routes: Routes = [
    {path: '', redirectTo: 'dashboard'},
    { path: 'dashboard', component: DashboardPageComponent, canActivate: [AuthGuard]  },
    { path: 'login', component: LoginPageComponent  },
    { path: 'map', canActivate: [AuthGuard], component: MapPageComponent }
];
