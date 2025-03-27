import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { TrackListComponent } from './track-list.component';
import { TrackService } from '../track.service';
import { AuthService } from '../../auth.service';
import { of, throwError } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { By } from '@angular/platform-browser';

describe('TrackListComponent', () => {
  let component: TrackListComponent;
  let fixture: ComponentFixture<TrackListComponent>;
  let mockTrackService: any;
  let mockAuthService: any; // mocking auth

  beforeEach(() => {
    mockTrackService = {
      getTracks: jasmine.createSpy('getTracks').and.returnValue(of([
        { name: 'Test Track', album: 'Test Album', artist: 'Test Artist', duration: '3:00', genre: 'Test Genre' }
      ]))
    };

    // mocking auth
    mockAuthService = {
      login: jasmine.createSpy('login').and.returnValue(of({ access_token: 'test_token' })),
      isAuthenticated: jasmine.createSpy('isAuthenticated').and.returnValue(true),
      getToken: jasmine.createSpy('getToken').and.returnValue('test_token'),
      logout: jasmine.createSpy('logout')
    };

    TestBed.configureTestingModule({
      imports: [FormsModule, CommonModule, TrackListComponent],
      providers: [
        { provide: TrackService, useValue: mockTrackService },
        { provide: AuthService, useValue: mockAuthService }
      ]
    });
    fixture = TestBed.createComponent(TrackListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should NOT load tracks on init', () => {
    fixture.detectChanges();
    expect(mockTrackService.getTracks).not.toHaveBeenCalled();
    expect(component.tracks.length).toBe(0);
  });

  it('should load tracks on fetch button click', fakeAsync(() => {
    fixture.detectChanges();
    const fetchButton = fixture.debugElement.query(By.css('button.bg-blue-500'));
    fetchButton.triggerEventHandler('click', null);
    tick();
    expect(mockTrackService.getTracks).toHaveBeenCalled();
    expect(component.tracks.length).toBe(1);
    expect(component.tracks[0].name).toBe('Test Track');
  }));

  it('should update tracks on search term change AFTER initial fetch', fakeAsync(() => {
    fixture.detectChanges();

    const fetchButton = fixture.debugElement.query(By.css('button.bg-blue-500'));
    fetchButton.triggerEventHandler('click', null);
    tick();

    component.searchTerm = 'evil';
    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    inputElement.value = "evil";
    fetchButton.triggerEventHandler('click', null);
    tick();

    expect(mockTrackService.getTracks).toHaveBeenCalledTimes(2);
    expect(mockTrackService.getTracks).toHaveBeenCalledWith('evil');
  }));

  it('should not update tracks on search term change BEFORE initial fetch', () => {
    fixture.detectChanges();

    component.searchTerm = 'evil';
    fixture.detectChanges();

    expect(mockTrackService.getTracks).not.toHaveBeenCalled();
  });

  it('should handle errors when fetching tracks', fakeAsync(() => {
    mockTrackService.getTracks.and.returnValue(throwError(() => new Error('Test Error')));
    fixture.detectChanges();

    const fetchButton = fixture.debugElement.query(By.css('button.bg-blue-500'));
    fetchButton.triggerEventHandler('click', null);
    tick();
    fixture.detectChanges();

    expect(mockTrackService.getTracks).toHaveBeenCalled();
    expect(component.errorMessage).toBe('Test Error');
    const errorElement = fixture.debugElement.query(By.css('.bg-red-100'));
    expect(errorElement).toBeTruthy();
    expect(errorElement.nativeElement.textContent).toContain('Test Error');
  }));
});