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
    
   
    await this.storage.set('intro_visto', true);
    

    this.navCtrl.navigateRoot('/login'); 
  }
}