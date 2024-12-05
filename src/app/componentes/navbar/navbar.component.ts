// navbar.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private router: Router) {}

  // Método para cerrar sesión
  logout(): void {
    // Elimina el token de localStorage
    localStorage.removeItem('authToken');

    // Redirige al login
    this.router.navigate(['/login']);
  }
}
