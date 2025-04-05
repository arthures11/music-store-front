import { createAction, props } from '@ngrx/store';
import { Track } from '../track.service';

export const loadTracks = createAction('[Tracks Page] Load Tracks');

export const loadTracksSuccess = createAction(
  '[Tracks API] Load Tracks Success',
  props<{ tracks: Track[] }>(),
);

export const loadTracksFailure = createAction(
  '[Tracks API] Load Tracks Failure',
  props<{ error: string }>(),
);

export const setSearchTerm = createAction(
  '[Tracks Page] Set Search Term',
  props<{ searchTerm: string }>(),
);

export const loadTracksFromRedis = createAction(
  '[Tracks Page] Load Tracks (Redis)',
);

export const loadTracksFromRedisSuccess = createAction(
  '[Tracks API] Load Tracks Success (Redis)',
  props<{ tracks: Track[] }>(),
);

export const loadTracksFromRedisFailure = createAction(
  '[Tracks API] Load Tracks Failure (Redis)',
  props<{ error: string }>(),
);
