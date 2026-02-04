import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StorageService } from '../services/storage-service';

@Injectable({
  providedIn: 'root'
})
export class IntroGuard implements CanActivate {

  constructor(private storage: StorageService, private router: Router) {}

  async canActivate(): Promise<boolean> {
   
    const introVisto = await this.storage.get('intro_visto');

    if (introVisto) {
    
      this.router.navigateByUrl('/login');
      return false; 
    } else {
    
      return true;
    }
  }
}