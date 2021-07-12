import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { Router, RouterModule } from '@angular/router';
import { EditRoutes } from './edit.routing';
import { ReactiveFormsModule } from '@angular/forms';
import { BeginComponent } from './begin/begin.component';
import { DetailsComponent } from './details/details.component';
import { CalibratorsResponsablesComponent } from './calibrators-responsables/calibrators-responsables.component';
import { ProvidersComponent } from './providers/providers.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { ActiveUpdateComponent } from './active-update/active-update.component';

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
  constructor(private router: Router){
    this.router.events.subscribe(val =>{
      console.log(val);
    });
  }
}
