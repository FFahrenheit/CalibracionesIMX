import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsComponent } from './details/details.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { NewDeviceRoutes } from './new-device.routing';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(NewDeviceRoutes),
  ]
})
export class NewDeviceModule { }
