import { Component } from '@angular/core';
import { NavbarModule } from '../../components/navbar-component/navbar.module';
import { CircleProgressModule } from '../../components/circle-progress/circle-progress.module';

@Component({
  selector: 'app-dashboard-page',
  imports: [NavbarModule, CircleProgressModule],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss',
  standalone: true
})
export class DashboardPageComponent {
  clientsData = [
    { percentage: 100, color: '#00C5CB', data: 'Clients in the App' }
  ];

  contractsData = [
    { percentage: 100, color: '#00C5CB', data: 'Contracts in the App' }
  ];

  courierData = [
    { percentage: 70, color: '#00C5CB', data: 'Couriers Working' },
    { percentage: 20, color: '#02969A', data: 'Couriers In Progress' },
    { percentage: 10, color: '#005659', data: 'Couriers Idle' },
  ];
}
