import { Routes } from '@angular/router';
import { GraphqlTrackListComponent } from './graphql-track-list/graphql-track-list.component';

export const routes: Routes = [
  {
    path: 'tracks',
    loadChildren: () =>
      import('./tracks/tracks.routes').then((m) => m.TRACKS_ROUTES),
    data: {
      preload: false,
    },
  },
  {
    path: 'graphql',
    component: GraphqlTrackListComponent,
  },

  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '**', redirectTo: '' },
];
