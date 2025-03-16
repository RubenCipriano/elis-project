import { Component, Injector, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CommonModule } from "@angular/common";
import { NavbarModule } from "../../components/navbar-component/navbar.module";
import { InputModule } from "../../components/input-component/input.module";
import { PrimaryButtonModule } from "../../components/primary-button-component/primary-button.module";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";

@Component({
    selector: 'login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['login-page.component.scss'],
    standalone: true,
    imports: [CommonModule,NavbarModule,InputModule, PrimaryButtonModule]
})

export class LoginPageComponent {

    email: string = '';
    password: string = '';

    constructor(private authService: AuthService,private router: Router) {
    }

    changedEmail(emailValue: any) {
        this.email = emailValue;
    }

    changedPassword(passwordValue: string) {
        this.password = passwordValue;
    }

    loginClickHandle = async (): Promise<void> => {
        try {

            await this.authService.login({email: this.email, password: this.password});

            this.router.navigate(["/dashboard"]);
            
        } catch (error) {
            console.error('Error:', error);  // Handle error
        }
    }
}
  