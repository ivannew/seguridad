import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';  
import { ServiciosloginService } from '../../servicios/servicioslogin.service';
import { Router } from '@angular/router';
import { Token } from '@angular/compiler';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  isActive = false;
  loginForm: FormGroup;  
  registerForm: FormGroup;  // Formulario para el registro

  constructor(
    private fb: FormBuilder,  
    private authService: ServiciosloginService,
    private router: Router
  ) {
    // Inicializa los formularios en el constructor
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],  
      password: ['', [Validators.required, Validators.minLength(8)]],  
    });

    this.registerForm = this.fb.group({
      name: ['', Validators.required],  // Validación del nombre
      email: ['', [Validators.required, Validators.email]],  
    password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[a-zA-Z]).*$/) // Al menos 1 mayúscula, 1 número y 1 alfanumérico
        ]
      ],
    });
  }

  activateRegister(): void {
    this.isActive = true;
    this.clearInputs();
  }

  activateLogin(): void {
    this.isActive = false;
    this.clearInputs();
  }

  clearInputs(): void {
    this.loginForm.reset();  
    this.registerForm.reset();  
  }

  register(): void {
    if (this.registerForm.invalid) {
      return;  // Si el formulario es inválido, no continuar
    }
  
    const userData = {
      fullnName: this.registerForm.value.name,  // Cambié a "fullnName"
      email: this.registerForm.value.email,
      passwordd: this.registerForm.value.password  // Cambié a "passwordd"
    };
  
    this.authService.registerUser(userData).subscribe(
      (response) => {
        console.log('Registro exitoso:', response);
        
        // Guardar el token en el localStorage
        if (response.token) {
          localStorage.setItem('authToken', response.token);
        }
  
        // Redirigir a la vista de encriptado
        this.router.navigate(['/encriptar']);
      },
      (error) => {
        console.error('Error al registrar:', error);
      }
    );
  }
  

  login(): void {
    const userData = {
      email: this.loginForm.value.email,
      passwordd: this.loginForm.value.password  // Cambia 'password' por 'passwordd'
    };
  
    this.authService.loginUser(userData).subscribe(
      (response) => {
        console.log('Login exitoso:', response);
  
        // Guardar el token en el localStorage
        if (response.token) {
          localStorage.setItem('authToken', response.token);
          this.router.navigate(['/encriptar']);  // Redirigir a la vista protegida
        }
      },
      (error) => {
        console.error('Error al iniciar sesión:', error);
      }
    );
  }
  
  
  
  
  
}
