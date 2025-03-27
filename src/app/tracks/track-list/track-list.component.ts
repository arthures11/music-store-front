import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Track, TrackService } from '../track.service';
import { Observable, Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import * as TrackActions from '../state/track.actions'; // Import actions
import {
  selectAllTracks,
  selectSearchTerm,
  selectTracksError,
  selectTracksLoading,
} from '../state/track.selectors';

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

  tracks$: Observable<Track[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(
    private trackService: TrackService,
    private store: Store,
  ) {
    this.tracks$ = this.store.select(selectAllTracks);
    this.loading$ = this.store.select(selectTracksLoading);
    this.error$ = this.store.select(selectTracksError);
  }

  currentSearchTerm: string = '';
  private searchTermSubscription: Subscription | undefined;

  ngOnInit(): void {
    // nothing anymore

    this.searchTermSubscription = this.store
      .select(selectSearchTerm)
      .subscribe((term) => {
        this.currentSearchTerm = term;
      });
  }

  ngOnDestroy(): void {
    if (this.trackSubscription) {
      this.trackSubscription.unsubscribe();
    }
  }

  fetchTracks(): void {
    this.store.dispatch(TrackActions.loadTracks());
  }

  onSearchTermChange(term: string): void {
    this.store.dispatch(TrackActions.setSearchTerm({ searchTerm: term }));
  }

  // loadTracks(): void {
  //   this.errorMessage = null;
  //   this.dataLoaded = true;
  //   this.trackSubscription = this.trackService
  //     .getTracks(this.searchTerm)
  //     .subscribe({
  //       next: (tracks) => {
  //         this.tracks = tracks;
  //         this.foundAmount = tracks.length;
  //       },
  //       error: (error) => {
  //         this.tracks = [];
  //         this.errorMessage = error.message;
  //       },
  //     });
  // }
}
