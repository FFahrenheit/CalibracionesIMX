import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { NavigationCancel, Router, RouterModule } from '@angular/router';
import { EditRoutes } from './edit.routing';
import { ReactiveFormsModule } from '@angular/forms';
import { BeginComponent } from './begin/begin.component';
import { DetailsComponent } from './details/details.component';
import { CalibratorsResponsablesComponent } from './calibrators-responsables/calibrators-responsables.component';
import { ProvidersComponent } from './providers/providers.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { ActiveUpdateComponent } from './active-update/active-update.component';
import { NavigationService } from '../services/navigation.service';

@NgModule({
  declarations: [
    BeginComponent,
    DetailsComponent,
    CalibratorsResponsablesComponent,
    ProvidersComponent,
    ConfirmComponent,
    ActiveUpdateComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(EditRoutes)
  ]
})
export class EditModule { 
constructor(private router      : Router,
              private navigation  : NavigationService){

    this.navigation.reactivate();

    this.router.events.subscribe((val) =>{

      if(val instanceof  NavigationCancel && !this.navigation.canNavigate()){
        console.log({ val, url: this.router.url});
        if(val.url.includes('/editar/')){
          this.navigation.deactivate();
          this.router.navigateByUrl(val.url); 
        }
        else if(this.router.url.includes('/editar/') && confirm('¿Desea salir sin guardar los cambios?')){
          this.navigation.deactivate();
          this.router.navigateByUrl(val.url); 
        }
      }
    });

  }
}
