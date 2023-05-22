import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { Author } from '../models/author';
import { HttpHeaders } from '@angular/common/http';
const TOKEN_KEY = 'api_token';
@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  endpoint = 'http://10.0.2.2:8000/api/authors';
  httpOptionsUsingUrlEncoded = {
    headers: new HttpHeaders({ 'Authorization': `Bearer ${window.sessionStorage.getItem(TOKEN_KEY)}` })
  };
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
  public createAuthor(author: Author, blob: Blob): Observable<any> {
    let data = new FormData();
    data.append("name", author.name);
    data.append("image", blob);
    data.append("description", author.description);
    data.append("method", 'POST');
    return this.httpClient.post<any>(this.endpoint, data, this.httpOptionsUsingUrlEncoded);
  }

  public updateAuthor(id: any, author: Author, blob: Blob): Observable<any> {
    let data = new FormData();
    data.append("id", id);
    data.append("name", author.name);
    data.append("description", author.description);
    data.append("method", 'PUT');
    data.append("image", blob);
    return this.httpClient.post<any>(this.endpoint, data, this.httpOptionsUsingUrlEncoded);
  }

  public deleteAuthor(id: any) {
    return this.httpClient.delete<any>(this.endpoint + '/' + id, this.httpOptionsUsingUrlEncoded);
  }

}
