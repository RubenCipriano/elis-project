import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component'; // Certifique-se de que o caminho está correto

@NgModule({
  declarations: [NavbarComponent], // Adicionando a declaração correta
  imports: [CommonModule], // Importando os módulos necessários
  exports: [NavbarComponent] // Agora pode ser exportado corretamente
})
export class NavbarModule {}
