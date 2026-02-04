import { Injectable } from '@angular/core';
import { StorageService } from './storage-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private storage: StorageService) { }

  async loginUser(credentials: any) {

    await this.storage.set('isUserLoggedIn', true);
    console.log("AuthService: Login forzado exitoso");
    return true; 
  }

  async registerUser(userData: any) {

    let users = await this.storage.get('registered_users') || [];
    users.push(userData);
    await this.storage.set('registered_users', users);
    return "Registro exitoso";
  }
}