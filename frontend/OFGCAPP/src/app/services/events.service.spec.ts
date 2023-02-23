import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EventsService } from './events.service';
import { Event } from '../models/event';

describe('EventsService', () => {
  let service: EventsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EventsService]
    });
    service = TestBed.inject(EventsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('getEvents', () => {
    it('should return an Observable<Event[]>', () => {
      const dummyEvents: Event[] = [
        new Event('Event 1', 'Description 1', '2022-01-01', 'Category 1'),
        new Event('Event 2', 'Description 2', '2022-01-02', 'Category 2')
      ];

      service.getEvents().subscribe(events => {
        expect(events).toEqual(dummyEvents);
      });

      const request = httpMock.expectOne(`${service.endpoint}?include=pieces`);
      expect(request.request.method).toBe('GET');
      request.flush(dummyEvents);
    });
  });


  describe('getEvent', () => {
    it('should return an Observable<Event>', () => {
      const dummyEvent: Event = new Event('Event 1', 'Description 1', '2022-01-01', 'Category 1');

      service.getEvent(1).subscribe(event => {
        expect(event).toEqual(dummyEvent);
      });

      const request = httpMock.expectOne(`${service.endpoint}/1?include=pieces`);
      expect(request.request.method).toBe('GET');
      request.flush(dummyEvent);
    });
  });

  // describe('createEvent', () => {
  //   it('should create an event and return an Observable<any>', () => {
  //     const dummyEvent: Event = new Event('Event 1', 'Description 1', '2022-01-01', 'Category 1');

  //     service.createEvent(dummyEvent).subscribe(response => {
  //       expect(response).toBeDefined();
  //       expect(response).toEqual({ success: true });
  //     });

  //     const request = httpMock.expectOne(`${service.endpoint}`);
  //     expect(request.request.method).toBe('POST');
  //     request.flush({ success: true });
  //   });
  // });

  // describe('updateEvent', () => {
  //   it('should update an event and return an Observable<any>', () => {
  //     const dummyEvent: Event = new Event('Event 1', 'Description 1', '2022-01-01', 'Category 1');

  //     service.updateEvent(1, dummyEvent).subscribe(response => {
  //       expect(response).toBeDefined();
  //       expect(response).toEqual({ success: true });
  //     });

  //     const request = httpMock.expectOne(`${service.endpoint}/1`);
  //     expect(request.request.method).toBe('PUT');
  //     request.flush({ success: true });
  //   });
  // });

  describe('deleteEvent', () => {
    it('should delete an event and return an Observable<any>', () => {
      service.deleteEvent(1).subscribe(response => {
        expect(response).toBeDefined();
        expect(response).toEqual({ success: true });
      });

      const request = httpMock.expectOne(`${service.endpoint}/1`);
      expect(request.request.method).toBe('DELETE');
      request.flush({ success: true });
    });
  });
});