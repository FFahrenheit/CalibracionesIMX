import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewDeviceComponent } from './view-device/view-device.component';
import { RouterModule } from '@angular/router';
import { DevicesRoutes } from './devices.routing';



@NgModule({
  declarations: [
    ViewDeviceComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(DevicesRoutes)
  ]
})
export class DevicesModule { }
