import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {AuthService} from "./auth.service";

export interface Track {
  name: string;
  album: string;
  artist: string;
  duration: string;
  genre: string;
}

@Injectable({
  providedIn: 'root'
})
export class TrackService {

  private apiUrl = 'http://127.0.0.1:8000/api/tracks'; // Use the correct URL

  constructor(private http: HttpClient, private authService: AuthService) { }

  getTracks(searchTerm: string = ''): Observable<Track[]> {
    let url = this.apiUrl;
    if (searchTerm) {
      url += `?name=${encodeURIComponent(searchTerm)}`;
    }

    const headers = this.authService.isAuthenticated()
        ? new HttpHeaders({ Authorization: `Bearer ${this.authService.getToken()}` })
        : new HttpHeaders();

    return this.http.get<Track[]>(url, { headers }).pipe(
        catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}