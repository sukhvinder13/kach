import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanActivate {
  private role :String;
  constructor(
    private router:Router,
    private service:ApiService
  ){}
  
  canActivate(route:ActivatedRouteSnapshot):boolean {
    if(this.service.isLoggedIn()){
      return true;
    }else{
      this.router.navigate(['/login']);
      return false;
    }
  }
  
}