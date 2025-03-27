import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import * as TrackActions from './track.actions';
import { Track } from '../track.service';
import { selectSearchTerm } from './track.selectors';
import { AuthService } from '../../auth.service';
import { Store } from '@ngrx/store';

@Injectable()
export class TrackEffects {
  private apiUrl = 'http://127.0.0.1:8000/api/tracks';

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private authService: AuthService,
    private store: Store,
  ) {
    console.log('checking action:', this.actions$);
  }

  loadTracks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TrackActions.loadTracks),
      withLatestFrom(this.store.select(selectSearchTerm)),
      switchMap(([action, searchTerm]) => {
        let url = this.apiUrl;
        if (searchTerm) {
          url += `?name=${encodeURIComponent(searchTerm)}`;
        }

        const headers = this.authService.isAuthenticated()
          ? new HttpHeaders({
              Authorization: `Bearer ${this.authService.getToken()}`,
            })
          : new HttpHeaders();

        return this.http.get<Track[]>(url, { headers }).pipe(
          map((tracks) => TrackActions.loadTracksSuccess({ tracks })),
          catchError((error) =>
            of(TrackActions.loadTracksFailure({ error: error.message })),
          ),
        );
      }),
    ),
  );
}
