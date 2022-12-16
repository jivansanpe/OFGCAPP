import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { Musician } from '../models/musician';
import { HttpHeaders } from '@angular/common/http';
const TOKEN_KEY = 'api_token';
@Injectable({
  providedIn: 'root'
})
export class MusicianService {

  endpoint = 'http://localhost:8000/api/musicians';
  httpOptionsUsingUrlEncoded = {
    headers: new HttpHeaders({ 'Authorization': `Bearer ${window.sessionStorage.getItem(TOKEN_KEY)}` })
  };
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
  public createMusician(musician: Musician, token: any): Observable<any> {
    return this.httpClient.post<any>(this.endpoint, musician, this.httpOptionsUsingUrlEncoded);
  }
}
