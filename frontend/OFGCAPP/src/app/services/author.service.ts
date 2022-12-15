import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  endpoint = 'http://localhost:8000/api/authors';

  constructor(private httpClient: HttpClient) { }


  getAuthors() {
    return this.httpClient.get(this.endpoint)
      .pipe(
        tap(users => console.log('Authors retrieved!')),
        // catchError(this.handleError('Get story', []))
      );
  }
  getAuthor(id: any) {
    return this.httpClient.get(this.endpoint + '/' + id)
      .pipe(
        tap(_ => console.log(`Author fetched: ${id}`)),
        // catchError(this.handleError<Story[]>(`Get story id=${id}`))
      );
  }

}
