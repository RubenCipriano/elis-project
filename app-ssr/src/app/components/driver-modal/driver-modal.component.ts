import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputComponent } from "../input-component/input.component";

@Component({
  selector: 'app-driver-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, InputComponent],
  templateUrl: './driver-modal.component.html',
  styleUrls: ['./driver-modal.component.scss']
})
export class DriverModalComponent {
  @Input() data: Record<string, any> = {};
  @Output() save = new EventEmitter<Record<string, any>>();
  @Output() cancel = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();

  objectKeys = Object.keys;

  onSave() {
    console.log('Saving data:', this.data);
    this.save.emit(this.data);
  }

  capitalize(key: string): string {
    return key.charAt(0).toUpperCase() + key.slice(1);
  }

  changedValue(data: any, event: any) {
    console.log(data, event);

    data = event.target.value;
  }
}
