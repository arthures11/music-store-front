import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TrackState } from './track.state';

export const trackFeatureKey = 'tracks';

export const selectTrackState =
  createFeatureSelector<TrackState>(trackFeatureKey);

export const selectAllTracks = createSelector(
  selectTrackState,
  (state: TrackState) => state.tracks,
);

export const selectTracksLoading = createSelector(
  selectTrackState,
  (state: TrackState) => state.loading,
);

export const selectTracksError = createSelector(
  selectTrackState,
  (state: TrackState) => state.error,
);

export const selectSearchTerm = createSelector(
  selectTrackState,
  (state: TrackState) => state.searchTerm,
);

export const selectRedisTracks = createSelector(
  selectTrackState,
  (state) => state.redisTracks,
);
export const selectRedisLoading = createSelector(
  selectTrackState,
  (state) => state.redisLoading,
);
export const selectRedisError = createSelector(
  selectTrackState,
  (state) => state.redisError,
);
