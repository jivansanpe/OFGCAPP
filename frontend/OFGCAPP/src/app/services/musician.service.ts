import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class MusicianService {

  endpoint = 'http://localhost:8000/api/musicians';

  constructor(private httpClient: HttpClient) { }


  getMusicians() {
    return this.httpClient.get(this.endpoint)
      .pipe(
        tap(users => console.log('Musicians retrieved!')),
        // catchError(this.handleError('Get story', []))
      );
  }
  getMusician(id: any) {
    return this.httpClient.get(this.endpoint + '/' + id)
      .pipe(
        tap(_ => console.log(`Musician fetched: ${id}`)),
        // catchError(this.handleError<Story[]>(`Get story id=${id}`))
      );
  }
}
