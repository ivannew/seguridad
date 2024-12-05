import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';  // Importa RouterModule
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';  // Importa tu módulo de rutas
import { EncriptadoComponent } from './componentes/encriptado/encriptado.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './componentes/login/login.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './componentes/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    EncriptadoComponent,
    LoginComponent,
    NavbarComponent  // Solo declaramos LoginComponent aquí
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, // Importa AppRoutingModule aquí
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule
    
    // LoginComponent NO debe ir aquí
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
