import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://localhost:3000/usuarios'; 

  constructor(private http: HttpClient) {}

  getUsuarios(page: number, pageSize: number, searchTerm?: string): Observable<{ items: Usuario[], totalItems: number }> {
    const offset = (page - 1) * pageSize;
  
    let params = new HttpParams()
      .set('limit', pageSize.toString())
      .set('offset', offset.toString());
  
    if (searchTerm) {
      params = params.set('searchTerm', searchTerm);
    }
  
    return this.http.get<{ items: Usuario[], totalItems: number }>(this.apiUrl, { params });
  }
  
  crearUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiUrl, usuario);
  }

  getUsuario(id: number): Observable<Usuario> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Usuario>(url);
  }

  actualizarUsuario(id: number, usuario: Usuario): Observable<Usuario> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Usuario>(url, usuario);
  }

  eliminarUsuario(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
