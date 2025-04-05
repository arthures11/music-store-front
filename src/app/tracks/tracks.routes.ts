import { Routes } from '@angular/router';
import { TrackListComponent } from './track-list/track-list.component';
import { trackFeatureKey } from './state/track.selectors';
import { provideState } from '@ngrx/store';
import * as fromTrack from './state/track.reducer';
import { provideEffects } from '@ngrx/effects';
import { TrackEffects } from './state/track.effects';
import { AuthService } from '../auth.service';

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
];
