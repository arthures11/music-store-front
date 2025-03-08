import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Track {
  name: string;
  album: string;
  artist: string;
  duration: string;
  genre: string;
}

@Injectable({
  providedIn: 'root'
})
export class TrackService {


  private mockTracks: Track[] = [
    { name: 'Bohemian Rhapsody', album: 'A Night at the Opera', artist: 'Queen', duration: '5:55', genre: 'Rock' },
    { name: 'Stairway to Heaven', album: 'Led Zeppelin IV', artist: 'Led Zeppelin', duration: '8:02', genre: 'Rock' },
    { name: 'Imagine', album: 'Imagine', artist: 'John Lennon', duration: '3:07', genre: 'Pop' },
    { name: 'Hotel California', album: 'Hotel California', artist: 'Eagles', duration: '6:30', genre: 'Rock' },
    { name: 'Billie Jean', album: 'Thriller', artist: 'Michael Jackson', duration: '4:54', genre: 'Pop' },
    { name: 'Smells Like Teen Spirit', album: 'Nevermind', artist: 'Nirvana', duration: '5:01', genre: 'Grunge' },
    { name: 'Like a Rolling Stone', album: 'Highway 61 Revisited', artist: 'Bob Dylan', duration: '6:13', genre: 'Folk Rock' },
    { name: 'Hey Jude', album: 'Hey Jude', artist: 'The Beatles', duration: '7:11', genre: 'Pop Rock' },
    { name: "Sweet Child o' Mine", album: "Appetite for Destruction", artist: 'Guns N\' Roses', duration: '5:56', genre: 'Hard Rock' },
    { name: 'One', album: '...And Justice for All', artist: 'Metallica', duration: '7:27', genre: 'Heavy Metal' }
  ];

  constructor() { }


  getTracks(searchTerm: string = ''): Observable<Track[]> {
    return of(this.mockTracks).pipe(
        map(tracks => tracks.filter(track =>
            track.name.toLowerCase().includes(searchTerm.toLowerCase())
        ))
    );

  }
}