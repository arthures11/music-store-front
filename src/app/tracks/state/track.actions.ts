import { createAction, props } from '@ngrx/store';
import { Track } from '../track.service';

// LOADING TRACKS
export const loadTracks = createAction('[Tracks Page] Load Tracks');

export const loadTracksSuccess = createAction(
  '[Tracks API] Load Tracks Success',
  props<{ tracks: Track[] }>(),
);

export const loadTracksFailure = createAction(
  '[Tracks API] Load Tracks Failure',
  props<{ error: string }>(),
);

// UPDATING THE SEARCH TERM
export const setSearchTerm = createAction(
  '[Tracks Page] Set Search Term',
  props<{ searchTerm: string }>(),
);
