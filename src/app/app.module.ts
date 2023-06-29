import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';
import { LoginComponent } from './login/login.component';
import { CrearUsuarioComponent } from './crearusuario/crear-usuario.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon'; // Agrega esta línea


@NgModule({
  declarations: [
    AppComponent,
    ListaUsuariosComponent,
    LoginComponent,
    CrearUsuarioComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, 
    AppRoutingModule, NgbModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
