import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { JwtDTO } from '../models/jwt-dto';
import { Login } from '../models/login';
import { NewUser } from '../models/new-user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authUrl = "http://localhost:8000/api/"

  constructor(private httpClient: HttpClient) { }

  public newUser(newUser: NewUser): Observable<any> {
    console.log('servicio');
    return this.httpClient.post<any>(this.authUrl + "register", newUser);
  }

  public loginUser(loginUser: Login): Observable<any> {
    return this.httpClient.post<JwtDTO>(this.authUrl + "login", loginUser);
  }
}
