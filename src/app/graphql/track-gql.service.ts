import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface GqlTrack {
  name: string;
  album: string;
  artist: string;
  duration: string;
  genre: string;
}

interface AllTracksQueryResult {
  tracks: GqlTrack[];
}

const GET_TRACKS_QUERY = gql`
  query GetTracks($nameFilter: String) {
    tracks(nameFilter: $nameFilter) {
      name
      album
      artist
      duration
      genre
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class TrackGqlService {
  constructor(private apollo: Apollo) {}

  watchTracks(nameFilter?: string): Observable<GqlTrack[]> {
    return this.apollo
      .watchQuery<AllTracksQueryResult>({
        query: GET_TRACKS_QUERY,
        variables: {
          nameFilter: nameFilter,
        },
      })
      .valueChanges.pipe(map((result) => result.data.tracks));
  }

  fetchTracksOnce(nameFilter?: string): Observable<GqlTrack[]> {
    return this.apollo
      .query<AllTracksQueryResult>({
        query: GET_TRACKS_QUERY,
        variables: {
          nameFilter: nameFilter,
        },
        fetchPolicy: 'network-only',
      })
      .pipe(map((result) => result.data.tracks));
  }
}
