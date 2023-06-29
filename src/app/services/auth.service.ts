import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth'; 
    isAuthenticated: any;
  constructor(private http: HttpClient) {}

  login(correoElectronico: string, password: string): Observable<boolean> {
    return this.http.post<any>(`${this.apiUrl}/login`, { correoElectronico, password })
      .pipe(
        map(response => {
          // Si el servidor devuelve un token, el inicio de sesión fue exitoso
          if (response && response.token) {
            // Almacenar el token en el almacenamiento local (localStorage)
            localStorage.setItem('token', response.token);
            return true;
          }
          return false;
        })
      );
  }

  logout(): void {
    // Eliminar el token del almacenamiento local al cerrar sesión
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    // Verificar si hay un token almacenado en el almacenamiento local para determinar si el usuario está autenticado
    return !!localStorage.getItem('token');
  }
}
