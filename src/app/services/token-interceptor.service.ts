import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpInterceptor } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private services: ApiService ) { }

  intercept(req, next) {
    let authService = this.services.getToken();
    let tokenizedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authService}`
      }
    })
    return next.handle(tokenizedReq);
  }
}