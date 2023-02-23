import { TestBed } from '@angular/core/testing';

import { TokenService } from './token.service';

describe('TokenService', () => {
  let service: TokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('setToken', () => {
    it('should set the token in sessionStorage', () => {
      const token = 'test-token';
      spyOn(window.sessionStorage, 'setItem');
      service.setToken(token);
      expect(window.sessionStorage.setItem).toHaveBeenCalledWith('api_token', token);
    });
  });

  describe('getToken', () => {
    it('should return the token from sessionStorage', () => {
      const token = 'test-token';
      spyOn(window.sessionStorage, 'getItem').and.returnValue(token);
      expect(service.getToken()).toEqual(token);
    });
  
    it('should return null if there is no token', () => {
      spyOn(window.sessionStorage, 'getItem').and.returnValue(null);
      expect(service.getToken()).toBeNull();
    });
  });

  describe('logOut', () => {
    it('should clear the sessionStorage', () => {
      spyOn(window.sessionStorage, 'clear');
      service.logOut();
      expect(window.sessionStorage.clear).toHaveBeenCalled();
    });
  });
});
