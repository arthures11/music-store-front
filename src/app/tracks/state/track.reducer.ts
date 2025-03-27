import { Action, createReducer, on } from '@ngrx/store';
import * as TrackActions from './track.actions';
import { initialTrackState, TrackState } from './track.state';

export const trackReducer = createReducer(
  initialTrackState,

  // HANDLING SETTING THE SEARCH TERM
  on(TrackActions.setSearchTerm, (state, { searchTerm }) => ({
    ...state,
    searchTerm: searchTerm,
  })),

  // HANDLING INITIALIZING TRACK LOADING
  on(TrackActions.loadTracks, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  // HANDLING SUCCESSFUL TRACK LOADING
  on(TrackActions.loadTracksSuccess, (state, { tracks }) => ({
    ...state,
    tracks: tracks,
    loading: false,
    error: null,
  })),

  // HANDLING FAILURE TO LOAD TRACKS
  on(TrackActions.loadTracksFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
  })),
);

export function reducer(state: TrackState | undefined, action: Action) {
  return trackReducer(state, action);
}
