import { Track } from '../track.service';

export interface TrackState {
  tracks: Track[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
}

export const initialTrackState: TrackState = {
  tracks: [],
  loading: false,
  error: null,
  searchTerm: '',
};
