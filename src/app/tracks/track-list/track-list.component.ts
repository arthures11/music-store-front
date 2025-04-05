import { Component, OnInit } from '@angular/core';
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
import { HighlightPipe } from '../../shared/pipes/highlight.pipe';

@Component({
  selector: 'app-track-list',
  standalone: true,
  imports: [FormsModule, CommonModule, HighlightPipe],
  templateUrl: './track-list.component.html',
})
export class TrackListComponent implements OnInit {
  tracks: Track[] = [];

  searchTerm: string = '';
  errorMessage: string | null = null;

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
    this.searchTermSubscription = this.store
      .select(selectSearchTerm)
      .subscribe((term) => {
        this.currentSearchTerm = term;
      });
  }

  fetchTracks(): void {
    this.store.dispatch(TrackActions.loadTracks());
  }

  onSearchTermChange(term: string): void {
    this.store.dispatch(TrackActions.setSearchTerm({ searchTerm: term }));
  }
}
