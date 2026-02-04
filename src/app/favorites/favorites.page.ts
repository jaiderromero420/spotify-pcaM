import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, NavController, ViewWillEnter } from '@ionic/angular'; // <--- ESTO FALTABA
import { StorageService } from '../services/storage-service';
import { Song } from '../services/music.service';
import { addIcons } from 'ionicons';
import { trashOutline, heartDislikeOutline, arrowBack } from 'ionicons/icons';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule] // <--- ESTO SOLUCIONA EL ERROR NG8001
})
export class FavoritesPage implements ViewWillEnter {

  favoriteSongs: Song[] = [];

  constructor(
    private storage: StorageService,
    private navCtrl: NavController
  ) {
    addIcons({ trashOutline, heartDislikeOutline, arrowBack });
  }

  
  async ionViewWillEnter() {
    await this.cargarFavoritos();
  }

  async cargarFavoritos() {
    const favs = await this.storage.get('favorites');
    this.favoriteSongs = favs || []; 
  }

  async borrarFavorito(song: Song) {
    this.favoriteSongs = this.favoriteSongs.filter(f => f.id !== song.id);
    await this.storage.set('favorites', this.favoriteSongs);
  }
}
