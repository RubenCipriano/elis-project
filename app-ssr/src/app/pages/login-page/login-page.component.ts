import { Component, Injector, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CommonModule } from "@angular/common";
import { NavbarModule } from "../../components/navbar-component/navbar.module";
import { PrimaryButtonModule } from "../../components/primary-button-component/primary-button.module";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { InputComponent } from "../../components/input-component/input.component";

@Component({
    selector: 'login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['login-page.component.scss'],
    standalone: true,
    imports: [CommonModule, FormsModule,NavbarModule, InputComponent, PrimaryButtonModule]
})

export class LoginPageComponent {

    email: string = '';
    password: string = '';

    constructor(private authService: AuthService,private router: Router) {
        if(authService.isAuthenticated())
            router.navigate(["/"]);
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

            setTimeout(() => {
                this.router.navigate(["/"]);
            }, 1000);
            
            
        } catch (error) {
            console.error('Error:', error);  // Handle error
        }
    }
}
  