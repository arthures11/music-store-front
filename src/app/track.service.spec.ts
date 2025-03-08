import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TrackService, Track } from './track.service';

describe('TrackService', () => {
  let service: TrackService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TrackService]
    });
    service = TestBed.inject(TrackService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get tracks', (done: DoneFn) => {
  const mockTracks: Track[] = [
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

    service.getTracks().subscribe(tracks => {
      expect(tracks).toEqual(mockTracks); // checking if the returned tracks match the mock data
      done();
    });
  });

  it('should get tracks with search term', (done: DoneFn) => {

    service.getTracks('Bohemian').subscribe(tracks => {
      expect(tracks.length).toBe(1);
      expect(tracks[0].name).toBe('Bohemian Rhapsody');
      done();
    });
  });
});