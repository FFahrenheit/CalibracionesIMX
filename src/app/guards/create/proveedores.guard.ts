import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { NewDeviceService } from 'src/app/services/new-device.service';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresGuard implements CanActivate {

  constructor(private create: NewDeviceService,
              private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    if (!this.create.hasSecondStep()) {
      this.router.navigate(['nuevo', 'responsables']);
    }
    return true;
  }

}
