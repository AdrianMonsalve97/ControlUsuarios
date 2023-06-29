import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../models/usuario';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  page: number = 1;
  pageSize: number = 5;
  totalItems: number = 0;

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.getUsuarios();
  }

  getUsuarios(): void {
    this.usuarioService.getUsuarios(this.page, this.pageSize)
      .subscribe(response => {
        this.usuarios = response.items;
        this.totalItems = response.totalItems;
      });
  }
  
  
}
