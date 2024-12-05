import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiciosloginService } from '../../servicios/servicioslogin.service';
@Component({
  selector: 'app-encriptado',
  templateUrl: './encriptado.component.html',
  styleUrl: './encriptado.component.css'
})
export class EncriptadoComponent {
  currentView = 'encriptar'; // Esto controla qué vista se muestra (encriptar o desencriptar)
  encriptarForm: FormGroup;
  desencriptarForm: FormGroup;
  resultadoEncriptar: string = '';
  resultadoDesencriptar: string = '';

  constructor(private fb: FormBuilder, private servicio: ServiciosloginService) {
    // Inicializa los formularios
    this.encriptarForm = this.fb.group({
      texto: ['', Validators.required]
    });

    this.desencriptarForm = this.fb.group({
      texto: ['', Validators.required]
    });
  }

  // Cambia la vista entre encriptar y desencriptar
  onViewChange(view: string): void {
    this.currentView = view;
  
    // Limpiar los formularios cuando cambies de vista
    if (view === 'encriptar') {
      this.encriptarForm.reset();
      this.resultadoEncriptar=""
    } else if (view === 'desencriptar') {
      this.desencriptarForm.reset();
      this.resultadoDesencriptar="";
    }
  }
  

  // Método para encriptar el texto
  onEncriptar(): void {
    const texto = this.encriptarForm.get('texto')?.value;
    const token = localStorage.getItem('authToken');  // Usa el mismo nombre que usaste para guardar el token
  
    console.log('Token en el localStorage:', token);  // Log para verificar si el token está presente
  
    if (token) {
      this.servicio.encriptarTexto(texto, token).subscribe(
        (response) => {
          console.log('Respuesta de encriptación:', response);
          this.resultadoEncriptar = response;
        },
        (error) => {
          console.error('Error en la encriptación', error);
        }
      );
    } else {
      console.error('No se encontró el token en el localStorage');
    }
  }
  
  
  

  onDesencriptar(): void {
    // Obtiene el texto del formulario de desencriptación
    const texto = this.desencriptarForm.get('texto')?.value;
  
    // Recupera el token de localStorage
    const token = localStorage.getItem('authToken');
  
    // Verifica si el texto y el token están presentes
    if (texto && token) {
      console.log('Texto a desencriptar:', texto);
      console.log('Token recuperado:', token); // Verifica que el token está presente
  
      // Llama al servicio para desencriptar el texto
      this.servicio.desencriptarTexto(texto, token).subscribe(
        (response) => {
          // Depuración: Imprime la respuesta de la API
          console.log('Respuesta de la API:', response);
  
          // Asigna la respuesta (texto desencriptado) a la propiedad correspondiente
          this.resultadoDesencriptar = response; // Si la respuesta es solo texto
  
          // Si la respuesta viene en formato objeto y contiene una propiedad, ajusta:
          // this.resultadoDesencriptar = response.textoDesencriptado;
        },
        (error) => {
          // Si ocurre un error en la API, lo muestra en la consola
          console.error('Error en la desencriptación', error);
        }
      );
    } else {
      // Si el texto o el token están vacíos, mostrar un error
      if (!texto) {
        console.error('Texto vacío');
      }
      if (!token) {
        console.error('Token no encontrado');
      }
    }
  }
  
  
  
  
}
