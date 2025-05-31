import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimaryButtonComponent } from './primary-button.component';

@NgModule({
  declarations: [PrimaryButtonComponent],  // Declarar o componente
  imports: [CommonModule],
  exports: [PrimaryButtonComponent]  // Exportar para ser usado em outros módulos
})
export class PrimaryButtonModule {}
