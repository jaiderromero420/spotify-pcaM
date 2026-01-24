import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage-service'; 

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] 
})
export class IntroPage implements OnInit {


  slides = [
    {
      title: "Bienvenido",
      desc: "Disfruta de la mejor música en un solo lugar.",
      image: "https://placehold.co/200x200/orange/white?text=Music",
      class: "slide-orange"
    },
    {
      title: "Explora",
      desc: "Descubre nuevos géneros y artistas cada día.",
      image: "https://placehold.co/200x200/blue/white?text=Explore",
      class: "slide-blue"
    },
    {
      title: "Organiza",
      desc: "Crea tus propias listas de reproducción favoritas.",
      image: "https://placehold.co/200x200/purple/white?text=Lists",
      class: "slide-purple"
    },
    {
      title: "Comparte",
      desc: "Envía tus canciones favoritas a tus amigos.",
      image: "https://placehold.co/200x200/green/white?text=Share",
      class: "slide-green"
    }
  ];

  constructor(private router: Router, private storage: StorageService) { }

  ngOnInit() {}

  async finalizarIntro() {
    console.log("Finalizando intro...");
    
   
    await this.storage.set('intro_visto', true);
    
   
    this.router.navigateByUrl('/Home');
  }
}