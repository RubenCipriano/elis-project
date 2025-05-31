import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DriverCardComponent } from './driver-card.component';

@NgModule({
  declarations: [DriverCardComponent], // Adicionando a declaração correta
  imports: [CommonModule], // Importando os módulos necessários
  exports: [DriverCardComponent] // Agora pode ser exportado corretamente
})
export class DriverCardModule {}
