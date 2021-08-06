import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AdminDeviceGuard implements CanActivate {

  constructor(private router  : Router,
              private login   : LoginService){
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
      if(!this.login.isAdmin()){
        this.router.navigate(['equipos', 'detalles', route.params.id]);
        return false;
      }
    return true;
  }
  
}
