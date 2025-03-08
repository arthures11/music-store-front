import { Component, OnInit, OnDestroy } from '@angular/core'; // Import OnDestroy
import { TrackService, Track } from '../track.service'; // Import TrackService and Track
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
  searchTerm: string = '';
  private trackSubscription: Subscription | undefined;

  constructor(private trackService: TrackService) { }

  ngOnInit(): void {
    this.loadTracks();
  }

  ngOnDestroy(): void {
    if (this.trackSubscription) {
      this.trackSubscription.unsubscribe();
    }
  }


  loadTracks(): void {
    this.trackSubscription = this.trackService.getTracks(this.searchTerm)
        .subscribe((tracks: Track[]) => {
          this.tracks = tracks;
        });
  }

  onSearchTermChange(): void{
    this.loadTracks();
  }
}