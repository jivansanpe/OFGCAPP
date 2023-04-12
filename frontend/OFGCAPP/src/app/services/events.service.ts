import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Event } from '../models/event';
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
  public createEvent(event: Event, blob: Blob): Observable<any> {
    let data = new FormData();
    data.append("name", event.name);
    data.append("image", blob);
    data.append("description", event.description);
    data.append("date", event.date);
    data.append("method", 'POST');
    data.append("category", event.category);
    data.append("musician_id", event.musician_id);
    data.append("link", event.link);
    return this.httpClient.post<any>(this.endpoint, data, this.httpOptionsUsingUrlEncoded);
  }
  public updateEvent(id: any, event: Event, blob: Blob): Observable<any> {
    let data = new FormData();
    data.append("id", id);
    data.append("name", event.name);
    data.append("description", event.description);
    data.append("method", 'PUT');
    data.append("image", blob);
    data.append("date", event.date);
    data.append("category", event.category);
    data.append("musician_id", event.musician_id);
    data.append("link", event.link);
    console.log(blob);
    return this.httpClient.post<any>(this.endpoint, data, this.httpOptionsUsingUrlEncoded);
  }
  public deleteEvent(id: any) {
    return this.httpClient.delete<any>(this.endpoint + '/' + id, this.httpOptionsUsingUrlEncoded);
  }
}