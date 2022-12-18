import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { HttpHeaders } from '@angular/common/http';

const TOKEN_KEY = 'api_token';
@Injectable({
  providedIn: 'root'
})
export class EventsService {

  endpoint = 'http://localhost:8000/api/events';
  httpOptionsUsingUrlEncoded = {
    headers: new HttpHeaders({ 'Authorization': `Bearer ${window.sessionStorage.getItem(TOKEN_KEY)}` })
  };
  constructor(private httpClient: HttpClient) { }


  getEvents() {
    return this.httpClient.get(this.endpoint + '?include=pieces')
      .pipe(
        tap(users => console.log('Events retrieved!')),
        // catchError(this.handleError('Get story', []))
      );
  }
  getEvent(id: any) {
    return this.httpClient.get(this.endpoint + '/' + id + '?include=pieces')
      .pipe(
        tap(_ => console.log(`Event fetched: ${id}`)),
        // catchError(this.handleError<Story[]>(`Get story id=${id}`))
      );
  }
  public updateEvent(id: any, event: Event): Observable<any> {
    return this.httpClient.put<any>(this.endpoint + '/' + id, event, this.httpOptionsUsingUrlEncoded);
  }
  public deleteEvent(id: any) {
    return this.httpClient.delete<any>(this.endpoint + '/' + id, this.httpOptionsUsingUrlEncoded);
  }
}