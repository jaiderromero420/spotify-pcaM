import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, NavController } from '@ionic/angular';
import { RouterLink, RouterLinkActive } from '@angular/router'; 
import { addIcons } from 'ionicons'; 
import { home, logOutOutline, videocamOutline, contrastOutline } from 'ionicons/icons';
import { StorageService } from '../services/storage-service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterLink, RouterLinkActive] 
})
export class MenuPage implements OnInit {

  constructor(
    private navCtrl: NavController,
    private storage: StorageService
  ) {
    addIcons({ home, logOutOutline, videocamOutline, contrastOutline });
  }

  ngOnInit() { }


  toggleTheme() {
    document.body.classList.toggle('light-theme');
  }

  async verIntro() {
    await this.storage.remove('intro_visto');
    this.navCtrl.navigateRoot('/intro');
  }

  async cerrarSesion() {
    await this.storage.remove('isUserLoggedIn');
    this.navCtrl.navigateRoot('/login');
  }
}