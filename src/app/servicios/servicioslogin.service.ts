import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiciosloginService {

  private apiUrl = 'http://ProyectoSeguridad.somee.com/api/AuthManagement/Register';
  private loginUrl = 'http://ProyectoSeguridad.somee.com/api/AuthManagement/Login';  // URL de login

  private apiUrlEncrypt = 'http://ProyectoSeguridad.somee.com/api/EncryptDecrypt/Encrypt?text=';
  private apiUrlDecrypt = 'http://ProyectoSeguridad.somee.com/api/EncryptDecrypt/Decrypt?text=';
  constructor(private http: HttpClient) { }
registerUser(userData: { fullnName: string, email: string, passwordd: string }): Observable<any> {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  return this.http.post<any>(this.apiUrl, userData, { headers });
}


loginUser(userData: { email: string; passwordd: string }): Observable<any> {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  return this.http.post<any>(this.loginUrl, userData, { headers });
}
encriptarTexto(texto: string, token: string): Observable<any> {
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`,
    'Accept': 'application/json',  // Puedes agregar otros encabezados si son necesarios
    'Content-Type': 'application/json',  // Asegúrate de que el tipo de contenido sea correcto
  });

  return this.http.get<any>(`${this.apiUrlEncrypt}${texto}`, { headers });
}



// Enviar el texto para desencriptar
desencriptarTexto(texto: string, token: string): Observable<any> {
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`,
    'Accept': 'application/json',  // Puedes mantener este encabezado si lo necesitas
  });

  return this.http.get<any>(`${this.apiUrlDecrypt}${encodeURIComponent(texto)}`, { 
    headers,
    responseType: 'text' as 'json'  // Asegúrate de que Angular reciba la respuesta como texto
  }).pipe(
   
  );
}

}
