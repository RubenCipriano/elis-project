import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CircleProgressComponent } from './circle-progress.component';

@NgModule({
  declarations: [CircleProgressComponent],  // Declarar o componente
  imports: [CommonModule],
  exports: [CircleProgressComponent]  // Exportar para ser usado em outros módulos
})
export class CircleProgressModule {}
