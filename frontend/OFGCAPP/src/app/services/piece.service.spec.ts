import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PieceService } from './piece.service';
import { Piece } from '../models/piece';

describe('PieceService', () => {
  let service: PieceService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PieceService]
    });
    service = TestBed.inject(PieceService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getPieces', () => {
    it('should return an Observable<Piece[]>', () => {
      const mockPieces: Piece[] = [
        new Piece('1', '1', 'Piece 1', 'Description 1'),
        new Piece('2', '2', 'Piece 2', 'Description 2')
      ];

      service.getPieces().subscribe(pieces => {
        expect(Array.isArray(pieces)).toBeTrue();
        expect(pieces).toEqual(mockPieces);
      });

      const request = httpMock.expectOne(`${service.endpoint}`);
      expect(request.request.method).toBe('GET');
      request.flush(mockPieces);
    });
  });

  describe('getPiece', () => {
    it('should return an Observable<Piece>', () => {
      const mockPiece: Piece = new Piece('1', '1', 'Piece 1', 'Description 1');

      service.getPiece('1').subscribe(piece => {
        expect(piece).toEqual(mockPiece);
      });

      const request = httpMock.expectOne(`${service.endpoint}/1`);
      expect(request.request.method).toBe('GET');
      request.flush(mockPiece);
    });
  });

  // describe('createPiece', () => {
  //   it('should return an Observable<any>', () => {
  //     const mockPiece: Piece = new Piece('1', '1', 'Piece 1', 'Description 1');
  //     const mockResponse = { message: 'Piece created successfully' };

  //     service.createPiece(mockPiece, 'token').subscribe(response => {
  //       expect(response).toEqual(mockResponse);
  //     });

  //     const request = httpMock.expectOne(`${service.endpoint}`);
  //     expect(request.request.method).toBe('POST');
  //     request.flush(mockResponse);
  //   });
  // });

  // describe('updatePiece', () => {
  //   it('should return an Observable<any>', () => {
  //     const mockPiece: Piece = new Piece('1', '1', 'Piece 1', 'Description 1');
  //     const mockResponse = { message: 'Piece updated successfully' };

  //     service.updatePiece('1', mockPiece).subscribe(response => {
  //       expect(response).toEqual(mockResponse);
  //     });

  //     const request = httpMock.expectOne(`${service.endpoint}/1`);
  //     expect(request.request.method).toBe('PUT');
  //     request.flush(mockResponse);
  //   });
  // });

  describe('deletePiece', () => {
    it('should return an Observable<any>', () => {
      const mockResponse = { message: 'Piece deleted successfully' };

      service.deletePiece('1').subscribe(response => {
        expect(response).toEqual(mockResponse);
      });

      const request = httpMock.expectOne(`${service.endpoint}/1`);
      expect(request.request.method).toBe('DELETE');
      request.flush(mockResponse);
    });
  });

});
