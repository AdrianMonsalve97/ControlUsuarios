import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';
import { DetallesUsuarioComponent } from './detalles-usuario/detalles-usuario.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from '../app/guards/auth.guard';
import { CrearUsuarioComponent } from './crearusuario/crear-usuario.component';

const routes: Routes = [
  { path: 'listusuarios', component: ListaUsuariosComponent },
  { path: 'usuarios/:id', component: DetallesUsuarioComponent },
  { path: 'cusuarios', component: CrearUsuarioComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
