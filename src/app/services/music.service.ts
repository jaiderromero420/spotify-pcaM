import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { MUSIC_DATA, Song } from './music.data';

@Injectable({
  providedIn: 'root'
})
export class MusicService {

  constructor(private http: HttpClient) { }

  getSongs(): Observable<Song[]> {
    return of(MUSIC_DATA);
  }

  getSongById(id: number): Song | undefined {
    return MUSIC_DATA.find(s => s.id === id);
  }
}

export { Song };