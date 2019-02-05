import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    const body = { email: email, password: password };

    return this.http.post('http://localhost:3000/api/auth', body, {responseType: 'text'})
      .pipe(
        map(resp => {
          if (resp) {
            // success, set local storage
            this.onLoggedIn(resp);
          }

          return resp; // return for error handling in component
        })
      );
  }

  logout() {
    localStorage.removeItem('access_token');
  }

  isUserLoggedIn(): boolean {
    return localStorage.getItem('access_token') !== null;
  }

  getUserToken(): string {
    return localStorage.getItem('access_token');
  }

  private onLoggedIn(token: string) {
    localStorage.setItem('access_token', token);
  }

}