import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { EncriptadoComponent } from './componentes/encriptado/encriptado.component';
import { AuthGuard } from './auth.guard.spec';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'encriptar', component: EncriptadoComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'login' }  // Ruta comodín para redirigir cualquier URL no encontrada
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
