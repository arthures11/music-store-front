import { Component, OnInit, OnDestroy } from '@angular/core';
import { TrackService, Track } from '../track.service';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-track-list',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './track-list.component.html',
})
export class TrackListComponent implements OnInit, OnDestroy {

  tracks: Track[] = [];

  foundAmount: number | null = null;
  searchTerm: string = '';
  private trackSubscription: Subscription | undefined;
  errorMessage: string | null = null;
  dataLoaded: boolean = false;

  constructor(private trackService: TrackService) { }

  ngOnInit(): void {
    // nothing anymore
  }

  ngOnDestroy(): void {
    if (this.trackSubscription) {
      this.trackSubscription.unsubscribe();
    }
  }

  loadTracks(): void {
    this.errorMessage = null;
    this.dataLoaded = true;
    this.trackSubscription = this.trackService.getTracks(this.searchTerm)
        .subscribe({
          next: (tracks) => {
            this.tracks = tracks;
            this.foundAmount = tracks.length;
          },
          error: (error) => {
            this.tracks = [];
            this.errorMessage = error.message;
          }
        });
  }

}