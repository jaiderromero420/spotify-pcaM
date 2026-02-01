import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StorageService } from '../services/storage-service'; // <-- corrected import

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private storage: StorageService, private router: Router) {}

  async canActivate(): Promise<boolean> {
    // Buscamos si el usuario ya inició sesión
    const isUserLoggedIn = await this.storage.get('isUserLoggedIn');

    if (isUserLoggedIn) {
      return true; // Si está logueado, lo dejamos pasar
    } else {
      // Si NO está logueado, lo mandamos al Login
      this.router.navigateByUrl('/login');
      return false;
    }
  }
}