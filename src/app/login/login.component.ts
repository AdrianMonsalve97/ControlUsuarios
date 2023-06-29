import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  correoElectronico: string = '';
  password: string = '';
  error: string = '';
  loginSuccess: boolean = false;

  constructor(private authService: AuthService) {}

  login(): void {
    this.authService.login(this.correoElectronico, this.password)
      .subscribe(
        response => {
          // Login exitoso
          this.loginSuccess = true;
          // Restablecer los campos de inicio de sesión
          this.correoElectronico = '';
          this.password = '';
        },
        error => {
          this.error = 'Credenciales inválidas'; // Actualiza el mensaje de error según tus necesidades
        }
      );
  }

  closeAlert(): void {
    this.loginSuccess = false;
  }
}
