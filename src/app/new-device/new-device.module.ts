import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsComponent } from './details/details.component';
import { SharedModule } from '../shared/shared.module';
import { NavigationCancel, Router, RouterModule } from '@angular/router';
import { NewDeviceRoutes } from './new-device.routing';
import { ReactiveFormsModule } from '@angular/forms';
import { CalibratorsResponsablesComponent } from './calibrators-responsables/calibrators-responsables.component';
import { CalibratorsComponent } from './calibrators/calibrators.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { NavigationService } from '../services/navigation.service';

@NgModule({
  declarations: [
    DetailsComponent,
    CalibratorsResponsablesComponent,
    CalibratorsComponent,
    ConfirmComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(NewDeviceRoutes),
  ]
})
export class NewDeviceModule {
  constructor(private router      : Router,
              private navigation  : NavigationService){

    this.router.events.subscribe((val) =>{

      if(val instanceof  NavigationCancel && !this.navigation.canNavigate()){
        console.log({ val, url: this.router.url});
        if(val.url.includes('/nuevo/')){
          this.navigation.deactivate();
          this.router.navigateByUrl(val.url); 
        }
        else if(this.router.url.includes('/nuevo/') && confirm('¿Desea salir sin guardar los cambios?')){
          this.navigation.deactivate();
          this.router.navigateByUrl(val.url); 
        }
      }
    });

  }
 }
