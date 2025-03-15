import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";

@Component({
    selector: 'navbar-component',
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.scss',
    standalone: false
})

export class NavbarComponent {
    @Input() isLogged: Boolean = false;
}