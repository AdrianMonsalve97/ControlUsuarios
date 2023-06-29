import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../models/usuario';

@Component({
  selector: 'app-detalles-usuario',
  templateUrl: './detalles-usuario.component.html',
  styleUrls: ['./detalles-usuario.component.css']
})
export class DetallesUsuarioComponent implements OnInit {
  usuario: Usuario = {
    id: 0,
    nombre: '',
    correoElectronico: '',
    imagen: '',
    direccion: '',
    numeroTelefono: '',
    password: ''
  }; 
  constructor(
    private route: ActivatedRoute,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.getDetallesUsuario();
  }

  getDetallesUsuario(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.usuarioService.getUsuario(id)
      .subscribe(usuario => this.usuario = usuario);
  }
}
