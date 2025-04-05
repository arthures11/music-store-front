import { Track } from '../track.service';

export interface TrackState {
  tracks: Track[];
  loading: boolean;
  error: string | null;
  redisTracks: Track[];
  redisLoading: boolean;
  redisError: string | null;

  searchTerm: string;
}

export const initialTrackState: TrackState = {
  tracks: [],
  loading: false,
  error: null,
  searchTerm: '',

  redisTracks: [],
  redisLoading: false,
  redisError: null,
};
