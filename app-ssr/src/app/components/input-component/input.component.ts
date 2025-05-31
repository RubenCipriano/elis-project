import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'input-component',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  imports: [FormsModule]
})

export class InputComponent {
  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() value: string = '';

  @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('inputElement', { static: true }) inputElement!: ElementRef;
  
  onInput(event: any): void {
    this.value = event.target.value;
    this.valueChange.emit(this.value);
  }
}
