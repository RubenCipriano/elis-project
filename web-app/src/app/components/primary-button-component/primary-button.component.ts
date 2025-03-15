import { Component, Input } from '@angular/core';

@Component({
  selector: 'primary-button-component',
  templateUrl: './primary-button.component.html',
  styleUrl: './primary-button.component.scss',
  standalone: false
})
export class PrimaryButtonComponent {
  @Input() text: string = 'Button';

  isLoading: boolean = false;
  
  isSuccess: boolean = false;

  @Input() callbackClick!: () => Promise<void>;

  async handleClick() {
    if (!this.callbackClick) return;

    this.isLoading = true;

    this.isSuccess = false;

    try {
      await this.callbackClick(); // Executa a função assíncrona recebida

      this.isSuccess = true;

    } catch (error) {
      console.error("Error executing button action:", error);
    }

    this.isLoading = false;

    setTimeout(() => {
      this.isSuccess = false
    }, 2000);
  }
}
