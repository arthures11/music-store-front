import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { environment } from '../../environments/environment';

export interface Track {
  name: string;
  album: string;
  artist: string;
  duration: string;
  genre: string;
}

@Injectable({
  providedIn: 'root',
})
export class TrackService {
  private apiUrl = environment.baseUrl + '/api/tracks';

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {}

  getTracks(searchTerm: string = ''): Observable<Track[]> {
    let url = this.apiUrl;
    if (searchTerm) {
      url += `?name=${encodeURIComponent(searchTerm)}`;
    }

    return this.http.get<Track[]>(url).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
