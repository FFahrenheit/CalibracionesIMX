import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class LenderGuard implements CanActivate {

  constructor(private router: Router,
    private login: LoginService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (!this.login.isLender() && !this.login.isAdmin()) {
      this.router.navigate(['']);
    }
    return true;
  }

}
