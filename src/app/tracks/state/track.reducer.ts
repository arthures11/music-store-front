import { Action, createReducer, on } from '@ngrx/store';
import * as TrackActions from './track.actions';
import { initialTrackState, TrackState } from './track.state';

export const trackReducer = createReducer(
  initialTrackState,

  on(TrackActions.setSearchTerm, (state, { searchTerm }) => ({
    ...state,
    searchTerm: searchTerm,
  })),

  on(TrackActions.loadTracks, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(TrackActions.loadTracksFromRedis, (state) => ({
    ...state,
    redisLoading: true,
    redisError: null,
  })),

  on(TrackActions.loadTracksSuccess, (state, { tracks }) => ({
    ...state,
    tracks: tracks,
    loading: false,
    error: null,
  })),
  on(TrackActions.loadTracksFromRedisSuccess, (state, { tracks }) => ({
    ...state,
    redisTracks: tracks,
    redisLoading: false,
    redisError: null,
  })),

  on(TrackActions.loadTracksFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
  })),
  on(TrackActions.loadTracksFromRedisFailure, (state, { error }) => ({
    ...state,
    reditLoading: false,
    redisError: error,
  })),
);

export function reducer(state: TrackState | undefined, action: Action) {
  return trackReducer(state, action);
}
