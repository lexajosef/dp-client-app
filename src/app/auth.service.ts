import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { tap, mapTo, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<Boolean> {
    const body = { email: email, password: password };

    return this.http.post('http://localhost:3000/api/auth', body, {responseType: 'text'})
      .pipe(
        tap(token => this.onLoggedIn(token)),
        mapTo(true),
        catchError(err => {
          this.handleError(err);
          return of(false);
        })
      );
  }

  logout() {
    localStorage.removeItem('access_token');
  }

  private onLoggedIn(token: string) {
    localStorage.setItem('access_token', token);
  }

  private handleError(error: Response | any) {
    console.error(error.message || error);
  }

}
