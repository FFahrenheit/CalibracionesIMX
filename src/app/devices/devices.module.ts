import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewDeviceComponent } from './view-device/view-device.component';
import { RouterModule } from '@angular/router';
import { DevicesRoutes } from './devices.routing';
import { DevicesListComponent } from './devices-list/devices-list.component';
import { SharedModule } from '../shared/shared.module';
import { NextDevicesComponent } from './next-devices/next-devices.component';
import { ProcessDevicesComponent } from './process-devices/process-devices.component';



@NgModule({
  declarations: [
    ViewDeviceComponent,
    DevicesListComponent,
    NextDevicesComponent,
    ProcessDevicesComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(DevicesRoutes),
    SharedModule
  ]
})
export class DevicesModule { }
