import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { Noti } from '../models/noti';
import { HttpHeaders } from '@angular/common/http';

const TOKEN_KEY = 'api_token';

@Injectable({
  providedIn: 'root'
})
export class NotiService {
  endpoint = 'https://www.monche.es/OFGC/backend/OFGCAPP/public/api/notifications';
  httpOptionsUsingUrlEncoded = {
    headers: new HttpHeaders({ 'Authorization': `Bearer ${window.sessionStorage.getItem(TOKEN_KEY)}` })
  };

  constructor(private httpClient: HttpClient) { }

  getNotis() {
    return this.httpClient.get(this.endpoint)
      .pipe(
        tap(users => console.log('Notis retrieved!')),
        // catchError(this.handleError('Get story', []))
      );
  }

  getNoti(id: any) {
    return this.httpClient.get(this.endpoint + '/' + id)
      .pipe(
        tap(_ => console.log(`Noti fetched: ${id}`)),
        // catchError(this.handleError<Story[]>(`Get story id=${id}`))
      );
  }

  public createNoti(noti: Noti): Observable<any> {
    return this.httpClient.post<any>(this.endpoint, noti, this.httpOptionsUsingUrlEncoded);
  }

  public updateNoti(id: any, noti: Noti): Observable<any> {
    return this.httpClient.put<any>(this.endpoint + '/' + id, noti, this.httpOptionsUsingUrlEncoded);
  }

  public deleteNoti(id: any) {
    return this.httpClient.delete<any>(this.endpoint + '/' + id, this.httpOptionsUsingUrlEncoded);
  }
}
