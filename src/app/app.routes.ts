import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'tracks',
    loadChildren: () =>
      import('./tracks/tracks.routes').then((m) => m.TRACKS_ROUTES),
    data: {
      preload: false,
    },
  },
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '**', redirectTo: '' },
];
