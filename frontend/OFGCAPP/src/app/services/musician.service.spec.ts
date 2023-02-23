import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MusicianService } from './musician.service';
import { Musician } from '../models/musician';

describe('MusicianService', () => {
  let service: MusicianService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MusicianService]
    });
    service = TestBed.inject(MusicianService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('getMusicians', () => {
    it('should return an Observable<Musician[]>', () => {
      const dummyMusicians: Musician[] = [
        new Musician('Musician 1', 'Description 1'),
        new Musician('Musician 2', 'Description 2')
      ];

      service.getMusicians().subscribe(musicians => {
        expect(Array.isArray(musicians)).toBeTrue();
        expect(musicians).toEqual(dummyMusicians);
      });

      const request = httpMock.expectOne(`${service.endpoint}`);
      expect(request.request.method).toBe('GET');
      request.flush(dummyMusicians);
    });
  });


  describe('getMusician', () => {
    it('should return an Observable<Musician>', () => {
      const dummyMusician: Musician = new Musician('Musician 1', 'Description 1');

      service.getMusician(1).subscribe(musician => {
        expect(musician).toEqual(dummyMusician);
      });

      const request = httpMock.expectOne(`${service.endpoint}/1`);
      expect(request.request.method).toBe('GET');
      request.flush(dummyMusician);
    });
  });

  // describe('createMusician', () => {
  //   it('should create a musician and return an Observable<any>', () => {
  //     const dummyMusician: Musician = new Musician('Musician 1', 'Description 1');

  //     service.createMusician(dummyMusician, 'dummy_token').subscribe(response => {
  //       expect(response).toBeDefined();
  //       expect(response).toEqual({ success: true });
  //     });

  //     const request = httpMock.expectOne(`${service.endpoint}`);
  //     expect(request.request.method).toBe('POST');
  //     request.flush({ success: true });
  //   });
  // });

  // describe('updateMusician', () => {
  //   it('should update a musician and return an Observable<any>', () => {
  //     const dummyMusician: Musician = new Musician('Musician 1', 'Description 1');

  //     service.updateMusician(1, dummyMusician).subscribe(response => {
  //       expect(response).toBeDefined();
  //       expect(response).toEqual({ success: true });
  //     });

  //     const request = httpMock.expectOne(`${service.endpoint}/1`);
  //     expect(request.request.method).toBe('PUT');
  //     request.flush({ success: true });
  //   });
  // });

  describe('deleteMusician', () => {
    it('should delete a musician and return an Observable<any>', () => {
      service.deleteMusician(1).subscribe(response => {
        expect(response).toBeDefined();
        expect(response).toEqual({ success: true });
      });

      const request = httpMock.expectOne(`${service.endpoint}/1`);
      expect(request.request.method).toBe('DELETE');
      request.flush({ success: true });
    });
  });
});
