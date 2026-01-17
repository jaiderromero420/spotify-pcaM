import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import  { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent,CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePage {
  genres = [
    {
      title: "Musica Clasica",
      image: "https://media.istockphoto.com/id/483289581/es/v%C3%ADdeo/notas-musicales.jpg?s=640x640&k=20&c=_q_AyHADfGhLB_FOd5picGz3kTOGs18vtjQOhq7yIbw=",
      class: "fondo",
      description: "La música clásica es un género musical de tradición occidental. Se caracteriza por su complejidad armónica, estructuras formales elaboradas y el uso de orquestas sinfónicas, instrumentos de cuerda, viento y percusión."
    },
    {
      title: "Hip-Hop",
      image: "https://i.ytimg.com/vi/ADdpLv3RDhA/hqdefault.jpg",
      description: "Género originado en los años 70 en Nueva York, caracterizado por ritmos marcados, bases de beats y rimas habladas o rappeadas. Incluye elementos como el DJing, breakdance y graffiti como parte de su cultura."
    },
    {
      title: "Pop",
      image: "https://expocompositores.com/cdn/shop/articles/unnamed_7_6f257b74-010b-41ae-98ba-06fbaa0df96d.jpg?v=1717946881",
      description: "Género musical orientado al consumo masivo, caracterizado por melodías pegajosas, estructuras simples y producciones pulidas. Evoluciona constantemente incorporando elementos de otros géneros para mantener su popularidad."
    },
    {
      title: "Elecotronica",
      image: "https://i.ytimg.com/vi/ueltGC-O2Gs/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLA7O6HAvo3W_AUJJgE6syrbuU7RRQ",
      description: "Música creada principalmente con instrumentos electrónicos y tecnología digital. Incluye subgéneros como house, techno, dubstep y EDM, caracterizados por ritmos bailables y sintetizadores."
    },
    {
      title: "Rock",
      image: "https://static.vecteezy.com/system/resources/thumbnails/049/286/641/small/rockstar-aestheticsgraphy-photo.jpeg",
      description: "Surgido en los años 50, se caracteriza por el uso prominente de guitarras eléctricas, bajo y batería. Abarca desde el rock clásico hasta subgéneros como punk, metal y rock alternativo."
    },
    {
      title: "Metal",
      image: "https://cdn.pixabay.com/photo/2015/10/21/16/39/metal-999958_640.jpg",
      description: "Un subgénero del rock, caracterizado por su alta distorsión de guitarra, ritmos potentes y a menudo letras oscuras o épicas. Existen muchos subgéneros dentro del metal, como el heavy metal, thrash metal, death metal y black metal, cada uno con sus propias características distintivas."
    },
    {
      title: "Reggaeton",
      image: "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da8428b9288398c47498847be403",
      description: "Género musical originario de Panamá y Puerto Rico en la década de 1990. Combina elementos del reggae, dancehall y hip hop con ritmos electrónicos y letras en español. Se caracteriza por su ritmo bailable y su fuerte influencia en la cultura latina."
    },
  ]
  constructor() {}
}
