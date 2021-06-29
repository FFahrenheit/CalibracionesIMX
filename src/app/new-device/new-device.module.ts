import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsComponent } from './details/details.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { NewDeviceRoutes } from './new-device.routing';
import { ReactiveFormsModule } from '@angular/forms';
import { CalibratorsResponsablesComponent } from './calibrators-responsables/calibrators-responsables.component';

@NgModule({
  declarations: [
    DetailsComponent,
    CalibratorsResponsablesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(NewDeviceRoutes),
  ]
})
export class NewDeviceModule { }
