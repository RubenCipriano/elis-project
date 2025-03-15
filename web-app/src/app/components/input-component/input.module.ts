import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input.component';

@NgModule({
  declarations: [InputComponent],  // Declarar o componente
  imports: [CommonModule],
  exports: [InputComponent]  // Exportar para ser usado em outros módulos
})
export class InputModule {}
