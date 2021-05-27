import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewDeviceComponent } from './view-device/view-device.component';
import { RouterModule } from '@angular/router';
import { DevicesRoutes } from './devices.routing';
import { DevicesListComponent } from './devices-list/devices-list.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    ViewDeviceComponent,
    DevicesListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(DevicesRoutes),
    SharedModule
  ]
})
export class DevicesModule { }
