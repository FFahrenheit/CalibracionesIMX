import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MaintenanceGuard implements CanActivate {
  
  constructor(private router : Router){}
  
  canActivate() {
    if(environment.maintenance){
      this.router.navigate(['503']);
    }
    return true;
  }
  
}
