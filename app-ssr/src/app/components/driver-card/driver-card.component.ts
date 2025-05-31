import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-driver-card',
  templateUrl: './driver-card.component.html',
  styleUrls: ['./driver-card.component.scss'],
  standalone: false,
})

export class DriverCardComponent {
  @Input() driver: any;
}
