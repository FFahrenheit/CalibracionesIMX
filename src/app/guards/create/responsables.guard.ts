import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { NavigationService } from 'src/app/services/navigation.service';
import { NewDeviceService } from 'src/app/services/new-device.service';

@Injectable({
  providedIn: 'root'
})
export class ResponsablesGuard implements CanActivate {

  constructor(private create  : NewDeviceService,
              private router  : Router,
              private nav     : NavigationService){
  }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
      if(!this.create.hasFirstStep()){
        this.nav.navigateWithPermission(['nuevo', 'detalles']);
        // this.router.navigate(['nuevo','detalles']);
      }
    return true;
  }
  
}
