import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient, HttpParams } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import * as TrackActions from './track.actions';
import { Track } from '../track.service';
import { selectSearchTerm } from './track.selectors';
import { AuthService } from '../../auth.service';
import { Store } from '@ngrx/store';
import { environment } from '../../../environments/environment';

@Injectable()
export class TrackEffects {
  private apiUrl = environment.baseUrl + '/api/tracks';

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private authService: AuthService,
    private store: Store,
  ) {}

  loadTracks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TrackActions.loadTracks),
      withLatestFrom(this.store.select(selectSearchTerm)),
      switchMap(([action, searchTerm]) => {
        let params = new HttpParams();

        if (searchTerm) {
          params = params.set('name', searchTerm);
        }
        const queryString = params.toString();
        const url = queryString ? `${this.apiUrl}?${queryString}` : this.apiUrl;

        return this.http.get<Track[]>(url).pipe(
          map((tracks) => TrackActions.loadTracksSuccess({ tracks })),
          catchError((error) =>
            of(TrackActions.loadTracksFailure({ error: error.message })),
          ),
        );
      }),
    ),
  );
}
