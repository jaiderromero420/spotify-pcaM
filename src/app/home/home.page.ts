import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController, MenuController, ToastController, ActionSheetController, NavController } from '@ionic/angular';
import { MusicService, Song } from '../services/music.service';
import { StorageService } from '../services/storage-service';
import { addIcons } from 'ionicons';
import { logoYen, musicalNotes, albums, play, ellipsisVertical, contrastOutline, heart, heartOutline, pause, person, close, folderOpenOutline, musicalNote, playSkipForward } from 'ionicons/icons';
import { register } from 'swiper/element/bundle';

register();

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
  songs: Song[] = [];
  allSongs: Song[] = []; 
  
  song: any = {
    name: '',
    preview_url: '',
    playing: false,
    artist: '',
    image: ''
  };

  currentSongData: Song | null = null;
  currentAudio: HTMLAudioElement | null = null;
  newTime: number = 0;

  constructor(
    private musicService: MusicService,
    private storage: StorageService,
    private modalCtrl: ModalController,
    private menuCtrl: MenuController,
    private toastCtrl: ToastController,
    private actionSheetCtrl: ActionSheetController,
    private navCtrl: NavController
  ) {
    addIcons({ logoYen, musicalNotes, albums, play, ellipsisVertical, contrastOutline, heart, heartOutline, pause, person, close, folderOpenOutline, musicalNote, playSkipForward });
  }

  ngOnInit() {
    this.menuCtrl.enable(true, 'first');
    this.cargarCanciones();
    this.loadFavorites();
  }

  cargarCanciones() {
    this.musicService.getSongs().subscribe((data) => {
      this.allSongs = data;
      this.songs = data;
    });
  }

  openMenu() {
    this.menuCtrl.open('first');
  }
  
  showSong(song: Song) {
    if (this.currentSongData && this.currentSongData.id === song.id) {
      if (this.song.playing) this.pause();
      else this.play();
      return;
    }

    this.currentSongData = song;
    this.song = { 
      name: song.title, 
      artist: song.artist,
      image: song.image,
      preview_url: song.url, 
      playing: false 
    };

    this.play();
  }

  play() {
    if (this.currentAudio) {
        if (this.currentAudio.src !== this.song.preview_url) {
            this.currentAudio.pause();
            this.currentAudio = new Audio(this.song.preview_url);
        }
    } else {
        this.currentAudio = new Audio(this.song.preview_url);
    }

    this.currentAudio.play();
    this.song.playing = true;

    this.currentAudio.addEventListener('timeupdate', () => {
      if(this.currentAudio && this.currentAudio.duration) {
        this.newTime = this.currentAudio.currentTime / this.currentAudio.duration;
      }
    });

    this.currentAudio.addEventListener('ended', () => { 
      this.nextSong(); 
    });
  }

  pause() {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.song.playing = false;
    }
  }

  nextSong() {
    if (!this.currentSongData) return;
    const currentIndex = this.songs.findIndex(s => s.id === this.currentSongData?.id);
    let nextIndex = currentIndex + 1;
    if (nextIndex >= this.songs.length) {
      nextIndex = 0;
    }
    const nextSong = this.songs[nextIndex];
    this.showSong(nextSong);
  }

  formatTime(seconds: number) {
    if (!seconds || isNaN(seconds)) return "0:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  }

  getRemainingTime() {
    if (!this.currentAudio) return 0;
    return (this.currentAudio.duration || 30) - (this.currentAudio.currentTime || 0);
  }

  async abrirFiltroGeneros() {
    const generos = [...new Set(this.allSongs.map(s => s.genre))];
    const botones = generos.map(g => ({
      text: g,
      icon: 'musical-notes',
      handler: () => { this.songs = this.allSongs.filter(s => s.genre === g); }
    }));
    botones.push({ text: 'Ver Todos', icon: 'close', handler: () => { this.songs = this.allSongs; } });
    const actionSheet = await this.actionSheetCtrl.create({ header: 'Filtrar', buttons: botones });
    await actionSheet.present();
  }

  async abrirFiltroAlbumes() {
    this.songs = this.allSongs;
    this.presentToast("Mostrando todas las canciones");
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
    } else {
      this.favorites.push(song);
    }
    await this.storage.set('favorites', this.favorites);
  }

  irAFavoritos() {
    this.navCtrl.navigateForward('/menu/favorites');
  }


  cambiarColor() { 
    this.isDarkTheme = !this.isDarkTheme; 
    document.body.classList.toggle('light-theme');
  }
  
  async presentToast(msg: string) {
    const t = await this.toastCtrl.create({ message: msg, duration: 1500, position: 'bottom', color: 'dark' });
    t.present();
  }
}