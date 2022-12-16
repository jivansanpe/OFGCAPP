import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

const TOKEN_KEY = 'api_token';


@Injectable({
  providedIn: 'root'
})
export class TokenService {

  roles: Array<string> = [];

  constructor() { }

  public setToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return window.sessionStorage.getItem(TOKEN_KEY)!;
  }


  public getUserName(): string {
    let userName = '';
    let aux: any;
    if (this.getToken()) {
      const sub = jwt_decode(this.getToken());
      aux = sub;
      userName = aux.sub;
    }
    return userName;
  }


  public logOut(): void {
    window.sessionStorage.clear();
  }
}
