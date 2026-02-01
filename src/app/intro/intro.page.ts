import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, NavController } from '@ionic/angular';
import { StorageService } from '../services/storage-service';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] 
})
export class IntroPage implements OnInit {

  // Usamos imágenes online para que te funcionen YA MISMO.
  // Si quieres usar locales, cambia el link por 'assets/images/tu_foto.png'
  slides = [
    { 
      title: "Bienvenido", 
      desc: "Toda tu música favorita en un solo lugar.", 
      image: "https://cdn-icons-png.flaticon.com/512/5229/5229354.png", 
      color: 'orange' 
    },
    { 
      title: "Explora", 
      desc: "Descubre nuevos artistas y géneros cada día.", 
      image: "https://cdn-icons-png.flaticon.com/512/2907/2907253.png", 
      color: 'blue' 
    },
    { 
      title: "Conecta", 
      desc: "Comparte tus listas con amigos al instante.", 
      image: "https://cdn-icons-png.flaticon.com/512/1534/1534348.png", 
      color: 'green' 
    }
  ];

  constructor(
    private navCtrl: NavController, 
    private storage: StorageService
  ) { }

  ngOnInit() {}

  async finalizarIntro() {
    console.log("Botón presionado: Guardando y saliendo...");
    
    // 1. Guardamos que ya vio la intro
    await this.storage.set('intro_visto', true);
    
    // 2. Navegamos al LOGIN (porque no ha iniciado sesión aun)
    // Usamos navigateRoot para que no pueda volver atrás a la intro
    this.navCtrl.navigateRoot('/login'); 
  }
}