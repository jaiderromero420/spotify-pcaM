import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; 
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";


import { 
  IonHeader, IonToolbar, IonTitle, IonContent, 
  IonButton, IonCard, IonCardHeader, IonCardTitle, 
  IonCardSubtitle, IonCardContent 
} from '@ionic/angular/standalone';


import { StorageService } from '../services/storage-service'; 

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true, 
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent, 
    IonButton, IonCard, IonCardHeader, IonCardTitle, 
    IonCardSubtitle, IonCardContent, 
    CommonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePage implements OnInit {
  
  
  isDarkTheme: boolean = false;
  colorClaro = '#f80707'; 
  colorOscuro = '#00ff37'; 
  colorActual = this.colorClaro; 

  
  genres = [
    {
      title: "Musica Clasica",
      image: "https://media.istockphoto.com/id/483289581/es/v%C3%ADdeo/notas-musicales.jpg?s=640x640&k=20&c=_q_AyHADfGhLB_FOd5picGz3kTOGs18vtjQOhq7yIbw=",
      class: "fondo",
      description: "La música clásica es un género musical de tradición occidental."
    },
    {
      title: "Hip-Hop",
      image: "https://i.ytimg.com/vi/ADdpLv3RDhA/hqdefault.jpg",
      description: "Género originado en los años 70 en Nueva York."
    },
    {
      title: "Pop",
      image: "https://expocompositores.com/cdn/shop/articles/unnamed_7_6f257b74-010b-41ae-98ba-06fbaa0df96d.jpg?v=1717946881",
      description: "Género musical orientado al consumo masivo."
    },
    {
      title: "Electronica",
      image: "https://i.ytimg.com/vi/ueltGC-O2Gs/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLA7O6HAvo3W_AUJJgE6syrbuU7RRQ",
      description: "Música creada principalmente con instrumentos electrónicos."
    },
    {
      title: "Rock",
      image: "https://static.vecteezy.com/system/resources/thumbnails/049/286/641/small/rockstar-aestheticsgraphy-photo.jpeg",
      description: "Surgido en los años 50, uso prominente de guitarras."
    },
    {
      title: "Metal",
      image: "https://cdn.pixabay.com/photo/2015/10/21/16/39/metal-999958_640.jpg",
      description: "Subgénero del rock, alta distorsión."
    },
    {
      title: "Reggaeton",
      image: "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da8428b9288398c47498847be403",
      description: "Género musical originario de Panamá y Puerto Rico."
    },
  ];


  constructor(
    private storageService: StorageService, 
    private router: Router
  ) {}

 
  async ngOnInit() {
   
    await this.loadStorageData();
   
    this.simularCargaDatos();
  }


  async cambiarColor() {
    this.isDarkTheme = !this.isDarkTheme;
    this.colorActual = this.isDarkTheme ? this.colorOscuro : this.colorClaro;
    
  
    await this.storageService.set('theme', this.colorActual);
    console.log('Tema guardado:', this.colorActual);
  }

  async loadStorageData() {
    const savedThemeColor = await this.storageService.get('theme');

    if (savedThemeColor) {
      this.colorActual = savedThemeColor;

     
      if (savedThemeColor === this.colorOscuro) {
        this.isDarkTheme = true;
      } else {
        this.isDarkTheme = false;
      }
    }
  }

  
  async simularCargaDatos() {
    const data = await this.obtenerDatosSimulados();
    console.log('Datos simulados: ', data);
  }

  obtenerDatosSimulados() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(['rock', 'pop', 'electronica']);
      }, 3000);
    });
  }

  
  async verIntroNuevamente() {
   
    await this.storageService.remove('intro_visto');
    console.log('Intro reiniciada. Redirigiendo a intro...');
    
   
    this.router.navigateByUrl('/intro');
  }
}