import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthorService } from './author.service';
import { Author } from '../models/author';

describe('AuthorService', () => {
  let authorService: AuthorService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthorService]
    });
    authorService = TestBed.inject(AuthorService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(authorService).toBeTruthy();
  });

  describe('getAuthors', () => {
    it('should send a GET request to the API and return an array of authors', () => {
      const mockAuthors: Author[] = [
        new Author('Author 1', 'Description 1'),
        new Author('Author 2', 'Description 2')
      ];
      authorService.getAuthors().subscribe(authors => {
        expect(authors).toEqual(mockAuthors);
      });
      const req = httpMock.expectOne('http://localhost:8000/api/authors');
      expect(req.request.method).toBe('GET');
      req.flush(mockAuthors);
    });
  });

  describe('getAuthor', () => {
    it('should send a GET request to the API with the specified author ID and return the author', () => {
      const mockAuthor: Author = new Author('Author 1', 'Description 1');
      authorService.getAuthor(1).subscribe(author => {
        expect(author).toEqual(mockAuthor);
      });
      const req = httpMock.expectOne('http://localhost:8000/api/authors/1');
      expect(req.request.method).toBe('GET');
      req.flush(mockAuthor);
    });
  });

  // describe('createAuthor', () => {
  //   it('should send a POST request to the API with the new author data', () => {
  //     const newAuthor: Author = new Author('New Author', 'New Description');
  //     authorService.createAuthor(newAuthor).subscribe();
  //     const req = httpMock.expectOne('http://localhost:8000/api/authors');
  //     expect(req.request.method).toBe('POST');
  //     expect(req.request.body).toEqual(newAuthor);
  //     req.flush({});
  //   });
  // });

  // describe('updateAuthor', () => {
  //   it('should send a PUT request to the API with the updated author data', () => {
  //     const updatedAuthor: Author = new Author('Updated Author', 'Updated Description');
  //     authorService.updateAuthor(1, updatedAuthor).subscribe();
  //     const req = httpMock.expectOne('http://localhost:8000/api/authors/1');
  //     expect(req.request.method).toBe('PUT');
  //     expect(req.request.body).toEqual(updatedAuthor);
  //     req.flush({});
  //   });
  // });

  describe('deleteAuthor', () => {
    it('should send a DELETE request to the API with the specified author ID', () => {
      authorService.deleteAuthor(1).subscribe();
      const req = httpMock.expectOne('http://localhost:8000/api/authors/1');
      expect(req.request.method).toBe('DELETE');
      req.flush({});
    });
  });
});

