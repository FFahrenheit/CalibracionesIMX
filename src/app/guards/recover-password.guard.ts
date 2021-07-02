import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ChangePasswordService } from '../services/change-password.service';

@Injectable({
  providedIn: 'root'
})
export class RecoverPasswordGuard implements CanDeactivate<unknown> {
  
  constructor(private changeService : ChangePasswordService){}
  
  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot) : boolean {
    return this.changeService.canNavigate();
  }
  
}
