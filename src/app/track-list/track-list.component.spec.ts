import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrackListComponent } from './track-list.component';
import { TrackService } from '../track.service';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

describe('TrackListComponent', () => {
  let component: TrackListComponent;
  let fixture: ComponentFixture<TrackListComponent>;
  let mockTrackService: any;

  beforeEach(() => {
    mockTrackService = {  //mocking TrackService
      getTracks: jasmine.createSpy('getTracks').and.returnValue(of([
        { name: 'Test Track', album: 'Test Album', artist: 'Test Artist', duration: '3:00', genre: 'Test Genre' } //mocking some data
      ]))
    };

    TestBed.configureTestingModule({
      imports: [FormsModule, CommonModule, TrackListComponent],
      providers: [
        { provide: TrackService, useValue: mockTrackService } //providing TrackService
      ]
    });
    fixture = TestBed.createComponent(TrackListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load tracks on init', () => {
    expect(mockTrackService.getTracks).toHaveBeenCalled();
    expect(component.tracks.length).toBe(1);
    expect(component.tracks[0].name).toBe('Test Track');
  });

  it('should update tracks on search term change', () => {
    component.searchTerm = 'new search';
    component.onSearchTermChange();
    expect(mockTrackService.getTracks).toHaveBeenCalledWith('new search');
  });
});