import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class PieceService {

  endpoint = 'http://localhost:8000/api/pieces';

  constructor(private httpClient: HttpClient) { }


  getPieces() {
    return this.httpClient.get(this.endpoint)
      .pipe(
        tap(users => console.log('Pieces retrieved!')),
        // catchError(this.handleError('Get story', []))
      );
  }
  getPiece(id: any) {
    return this.httpClient.get(this.endpoint + '/' + id)
      .pipe(
        tap(_ => console.log(`Piece fetched: ${id}`)),
        // catchError(this.handleError<Story[]>(`Get story id=${id}`))
      );
  }
}
