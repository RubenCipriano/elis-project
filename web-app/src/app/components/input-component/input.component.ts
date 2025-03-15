import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'input-component',
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  standalone: false
})

export class InputComponent {
  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input() placeholder: string = '';

  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild('inputElement', { static: true }) inputElement!: ElementRef;

  onInput(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.valueChange.emit(inputValue); // Emit value to parent
  }

  getValue() {
    return this.inputElement.nativeElement.value;
  }
}
