import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { Piece } from '../models/piece';
import { HttpHeaders } from '@angular/common/http';

const TOKEN_KEY = 'api_token';

@Injectable({
  providedIn: 'root'
})
export class PieceService {
  endpoint = 'http://localhost:8000/api/pieces';
  httpOptionsUsingUrlEncoded = {
    headers: new HttpHeaders({ 'Authorization': `Bearer ${window.sessionStorage.getItem(TOKEN_KEY)}` })
  };

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

  public createPiece(piece: Piece): Observable<any> {
    return this.createPieceAndEvents(piece, piece.selectedEventIds);
  }

  public updatePiece(id: any, piece: Piece): Observable<any> {
    return this.httpClient.put<any>(this.endpoint + '/' + id, piece, this.httpOptionsUsingUrlEncoded);
  }

  public deletePiece(id: any) {
    return this.httpClient.delete<any>(this.endpoint + '/' + id, this.httpOptionsUsingUrlEncoded);
  }

  private createPieceAndEvents(piece: Piece, selectedEventIds: number[]): Observable<any> {
    // Crear la pieza y obtener su ID
    return this.httpClient.post<any>(this.endpoint, piece, this.httpOptionsUsingUrlEncoded)
      .pipe(
        tap((response: any) => {
          const pieceId = response.id;
          // Crear los registros en la tabla pivote para vincular la pieza con los eventos seleccionados
          for (const eventId of selectedEventIds) {
            const data = { event_id: eventId, piece_id: pieceId };
            this.httpClient.post<any>('http://localhost:8000/api/event-piece', data, this.httpOptionsUsingUrlEncoded).subscribe(
              res => console.log(res),
              err => console.log(err)
            );
          }
        }),
      );
  }
}
