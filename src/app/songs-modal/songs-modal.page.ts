import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController, NavParams } from '@ionic/angular'; // Importante: ModalController y NavParams
import { Song } from '../services/music.service';

@Component({
  selector: 'app-songs-modal',
  templateUrl: './songs-modal.page.html',
  styleUrls: ['./songs-modal.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class SongsModalPage implements OnInit {

  song: Song | null = null; // Aquí guardaremos la canción que nos pasen
  albumTitle: string = "Detalles";

  constructor(
    private modalCtrl: ModalController,
    private navParams: NavParams // Para recibir datos
  ) { }

  ngOnInit() {
   
    this.song = this.navParams.get('song');
    this.albumTitle = this.navParams.get('title') || 'Canción';
    console.log("Modal abierto con:", this.song);
  }
  async selectSong() {
    console.log("Canción seleccionada:", this.song);
    await this.modalCtrl.dismiss(this.song);
  }



  async close() {
    await this.modalCtrl.dismiss();
  }

}
