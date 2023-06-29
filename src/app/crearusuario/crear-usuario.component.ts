import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../models/usuario';
import { MatFormFieldAppearance } from '@angular/material/form-field';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit {
  usuario: Usuario = {
    id: 1,
    nombre: '',
    correoElectronico: '',
    imagen: '',
    direccion: '',
    numeroTelefono: '',
    password: ''
  };
  
  imagen: File | undefined;
  imagenName: string | undefined;
  imagenError = false;

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {}

  crearUsuario(): void {
    this.usuarioService.crearUsuario(this.usuario)
      .subscribe(usuario => {
        // Manejar respuesta del servidor
      });
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.imagen = file;
      this.imagenName = file.name;
      this.imagenError = false;
    }
  }

  seleccionarImagen(): void {
    const fileInput = document.getElementById('imagen');
    if (fileInput) {
      fileInput.click();
    }
  }
}
