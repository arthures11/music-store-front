import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CustomPreloadingStrategy implements PreloadingStrategy {
  constructor() {
    console.log('CustomPreloadingStrategy initialized');
  }

  preload(route: Route, load: () => Observable<any>): Observable<any> {
    if (route.data && route.data['preload'] === true) {
      console.log('PRELOADED ' + route.path);
      return load();
    }
    console.log('did not preload ' + route.path);
    return of(null);
  }
}
