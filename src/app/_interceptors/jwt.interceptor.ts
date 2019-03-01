import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService } from '../_services/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization jwt token to header of requests
    if (this.authService.isUserLoggedIn()) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${this.authService.getUserToken()}`
        }
      });
    }
    
    return next.handle(req);
  }

}
