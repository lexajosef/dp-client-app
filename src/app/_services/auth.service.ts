import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as jwtDecode from 'jwt-decode';

import { environment } from '../../environments/environment';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly tokenKey: string = 'token';
  private readonly userPayloadKey: string = 'userObj';
  private readonly apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<string> {
    const body = { email: email, password: password };

    return this.http.post(`${this.apiUrl}/auth`, body, {responseType: 'text'})
      .pipe(
        map(resp => {
          if (resp) this.onLoggedIn(resp);
          return resp; // return for error handling in component
        })
      );
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
  }

  isUserLoggedIn(): boolean {
    return localStorage.getItem(this.tokenKey) !== null;
  }

  getUserToken(): string {
    return localStorage.getItem(this.tokenKey);
  }

  getUserTokenPayload(): any {
    return jwtDecode(this.getUserToken());
  }

  private onLoggedIn(token: string) {
    localStorage.setItem(this.tokenKey, token);
    localStorage.setItem(this.userPayloadKey, JSON.stringify(this.getUserTokenPayload()));
  }

}
