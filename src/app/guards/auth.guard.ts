import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      // El usuario está autenticado, permitir acceso a la ruta
      return true;
    } else {
      // El usuario no está autenticado, redirigir al componente de inicio de sesión
      this.router.navigate(['/login']);
      return false;
    }
  }
}
