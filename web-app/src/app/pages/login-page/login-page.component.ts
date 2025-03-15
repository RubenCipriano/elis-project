import { Component, Injector, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CommonModule } from "@angular/common";
import { NavbarModule } from "../../components/navbar-component/navbar.module";
import { InputModule } from "../../components/input-component/input.module";
import { PrimaryButtonModule } from "../../components/primary-button-component/primary-button.module";

@Component({
    selector: 'login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['login-page.component.scss'],
    standalone: true,
    imports: [CommonModule,NavbarModule,InputModule, PrimaryButtonModule]
})

export class LoginPageComponent {

    httpClient: HttpClient;

    email: string = '';
    password: string = '';

    constructor(httpClient: HttpClient) {
        this.httpClient = httpClient;
    }

    changedEmail(emailValue: any) {
        this.email = emailValue;
    }

    changedPassword(passwordValue: string) {
        this.password = passwordValue;
    }

    loginClickHandle = async (): Promise<void> => {
        try {
            const response = await this.httpClient
                .post("http://5.249.164.180:5000/api/auth/login", {
                    "email": this.email,
                    "password": this.password
                })
                .toPromise();  // Using toPromise for async/await
    
            console.log('Response:', response);  // Log the response
        } catch (error) {
            console.error('Error:', error);  // Handle error
        }
    }
}
  