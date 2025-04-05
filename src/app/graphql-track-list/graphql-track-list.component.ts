import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GqlTrack, TrackGqlService } from '../graphql/track-gql.service'; // Import service and type

@Component({
  selector: 'app-graphql-track-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './graphql-track-list.component.html',
})
export class GraphqlTrackListComponent implements OnInit, OnDestroy {
  tracks$: Observable<GqlTrack[]> | undefined;
  loading: boolean = false;
  error: any = null;

  searchTerm: string = '';
  private searchTerms = new Subject<string>();
  private destroy$ = new Subject<void>();

  constructor(private trackGqlService: TrackGqlService) {}

  ngOnInit(): void {
    this.tracks$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => {
        this.loading = true;
        this.error = null;
      }),
      switchMap((term: string) => this.trackGqlService.watchTracks(term)),
      tap(() => (this.loading = false)),
      takeUntil(this.destroy$),
    );

    this.searchTerms.next(this.searchTerm);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }
}
