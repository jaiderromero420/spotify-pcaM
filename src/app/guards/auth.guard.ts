import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StorageService } from '../services/storage-service'; 

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private storage: StorageService, private router: Router) {}

  async canActivate(): Promise<boolean> {
    const isLoggedIn = await this.storage.get('isUserLoggedIn');
    
    if (isLoggedIn) {
      return true; // ¡Pasa!
    } else {
      console.log("Bloqueado por AuthGuard: Enviando al login...");
      this.router.navigateByUrl('/login');
      return false; // ¡Alto ahí!
    }
  }
}