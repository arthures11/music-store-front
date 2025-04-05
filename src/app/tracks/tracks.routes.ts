import { Routes } from '@angular/router';
import { TrackListComponent } from './track-list/track-list.component';
import { trackFeatureKey } from './state/track.selectors';
import { provideState } from '@ngrx/store';
import * as fromTrack from './state/track.reducer';
import { provideEffects } from '@ngrx/effects';
import { TrackEffects } from './state/track.effects';
import { AuthService } from '../auth.service';
import { TrackListRedisComponent } from './track-list-redis/track-list-redis.component';

export const TRACKS_ROUTES: Routes = [
  {
    path: '',
    component: TrackListComponent,
    providers: [
      provideState(trackFeatureKey, fromTrack.reducer),
      provideEffects(TrackEffects),
      AuthService,
    ],
  },
  {
    path: 'redis',
    component: TrackListRedisComponent,
    providers: [
      provideState(trackFeatureKey, fromTrack.reducer),
      provideEffects(TrackEffects),
      AuthService,
    ],
  },
];
