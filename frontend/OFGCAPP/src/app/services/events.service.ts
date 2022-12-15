import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class EventsService {

  endpoint = 'http://localhost:8000/api/events';

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
}