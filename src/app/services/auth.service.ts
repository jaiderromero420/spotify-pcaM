import { Injectable } from '@angular/core';
import { StorageService } from './storage-service'; // Asegúrate de importar tu servicio de storage

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  constructor(private storage: StorageService) { }

  loginUser(credentials: any) {
    return new Promise((accept, reject) => {
      if (
        credentials.email === "yo@gmail.com" &&
        credentials.password === "12345"
      ) {
        // Guardamos sesión
        this.storage.set('isUserLoggedIn', true);
        accept("Login correcto");
      } else {
        reject("Login incorrecto");
      }
    });
  }

  registerUser(userData: any) {
    return new Promise((accept, reject) => {
      // Simulamos una validación simple
      if (userData.password.length >= 5) {
        // Guardamos los datos del usuario en el storage
        this.storage.set('user_data', userData);
        accept("Registro exitoso");
      } else {
        reject("Error en el registro");
      }
    });
  }
}
