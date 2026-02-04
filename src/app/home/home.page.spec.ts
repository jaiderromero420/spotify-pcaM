import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { IonicModule, ModalController, MenuController, ToastController, ActionSheetController } from '@ionic/angular'; // Agregado ActionSheetController
import { MusicService, Song } from '../services/music.service';
import { StorageService } from '../services/storage-service';
import { SongsModalPage } from '../songs-modal/songs-modal.page';
import { addIcons } from 'ionicons';
import { logoYen, musicalNotes, albums, play, ellipsisVertical, contrastOutline, heart, heartOutline, pause, person, close } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePage implements OnInit {

  favorites: Song[] = [];
  isDarkTheme: boolean = true;
  
  allSongs: Song[] = []; 
  songs: Song[] = [];    
  
  song: any = {
    name: '',
    preview_url: '',
    playing: false
  };
  
  currentSong: HTMLAudioElement | null = null;
  newTime: number = 0;

  constructor(
    private musicService: MusicService,
    private storage: StorageService,
    private modalCtrl: ModalController,
    private menuCtrl: MenuController,
    private toastCtrl: ToastController,
    private actionSheetCtrl: ActionSheetController 
  ) {
    addIcons({ logoYen, musicalNotes, albums, play, ellipsisVertical, contrastOutline, heart, heartOutline, pause, person, close });
  }

  ngOnInit() {
    
    this.menuCtrl.enable(true, 'first');
    
    this.cargarCanciones();
    this.loadFavorites();
  }

  cargarCanciones() {
    this.musicService.getSongs().subscribe({
      next: (data) => {
        console.log('Canciones recibidas:', data);
        this.allSongs = data; 
        this.songs = data;    
      },
      error: (err) => {
        console.error('Error:', err);
        this.presentToast('Error de conexión con la música.');
      }
    });
  }

  

  async abrirFiltroGeneros() {
  
    const generosUnicos = [...new Set(this.allSongs.map(item => item.genre || 'Desconocido'))];

    const botones = generosUnicos.map(genero => ({
      text: genero,
      icon: 'musical-notes',
      handler: () => {
        this.filtrarPor('genre', genero);
      }
    }));

   
    botones.push({
      text: 'Ver Todos',
      icon: 'close',
      handler: () => {
        this.songs = this.allSongs; 
      }
    });

    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Filtrar por Género',
      buttons: botones,
      cssClass: 'xbox-action-sheet' 
    });
    await actionSheet.present();
  }

  async abrirFiltroAlbumes() {
    
    const artistasUnicos = [...new Set(this.allSongs.map(item => item.artist))];

    const botones = artistasUnicos.map(artista => ({
      text: artista,
      icon: 'albums',
      handler: () => {
        this.filtrarPor('artist', artista);
      }
    }));

    botones.push({
      text: 'Ver Todos',
      icon: 'close',
      handler: () => {
        this.songs = this.allSongs;
      }
    });

    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Filtrar por Artista/Álbum',
      buttons: botones
    });
    await actionSheet.present();
  }

  filtrarPor(campo: string, valor: string) {
  
    this.songs = this.allSongs.filter((s: any) => s[campo] === valor);
    this.presentToast(`Filtrado por: ${valor}`);
  }



  async loadFavorites() {
    const favs = await this.storage.get('favorites');
    if (favs) this.favorites = favs;
  }

  isFavorite(song: Song): boolean {
    return this.favorites.some(f => f.id === song.id);
  }

  async toggleFavorite(song: Song, event: Event) {
    event.stopPropagation();
    if (this.isFavorite(song)) {
      this.favorites = this.favorites.filter(f => f.id !== song.id);
      await this.presentToast('Eliminado de favoritos');
    } else {
      this.favorites.push(song);
      await this.presentToast('Añadido a favoritos ❤️');
    }
    await this.storage.set('favorites', this.favorites);
  }

  cambiarColor() {
    this.isDarkTheme = !this.isDarkTheme;
  }

  openMenu() {
    console.log("Intentando abrir menú...");
    this.menuCtrl.open('first'); 
  }

  async showSong(song: Song) {
    const modal = await this.modalCtrl.create({
      component: SongsModalPage,
      componentProps: { song: song, title: song.title }
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    if (data) {
      this.song = { name: data.title, preview_url: data.url, playing: false };
      this.play(); 
    }
  }

  play() {
    if (this.currentSong) this.currentSong.pause();
    
   
    if (!this.song.preview_url) return;

    if (!this.currentSong || this.currentSong.src !== this.song.preview_url) {
        this.currentSong = new Audio(this.song.preview_url);
    }
    this.currentSong.play();
    this.song.playing = true;
    
    this.currentSong.addEventListener('timeupdate', () => {
      if (this.currentSong && this.currentSong.duration) {
        this.newTime = this.currentSong.currentTime / this.currentSong.duration;
      }
    });
    this.currentSong.addEventListener('ended', () => {
        this.song.playing = false;
        this.newTime = 0;
    });
  }

  pause() {
    if (this.currentSong) {
      this.currentSong.pause();
      this.song.playing = false;
    }
  }

  formatTime(seconds: number) {
    if (!seconds || isNaN(seconds)) return "0:00";
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  getRemainingTime() {
    if (!this.currentSong?.duration || !this.currentSong?.currentTime) return 0;
    return this.currentSong.duration - this.currentSong.currentTime;
  }

  async presentToast(msg: string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 1500,
      position: 'bottom',
      color: 'dark'
    });
    toast.present();
  }
}

