import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewDeviceComponent } from './view-device/view-device.component';
import { RouterModule } from '@angular/router';
import { DevicesRoutes } from './devices.routing';
import { DevicesListComponent } from './devices-list/devices-list.component';
import { SharedModule } from '../shared/shared.module';
import { NextDevicesComponent } from './next-devices/next-devices.component';
import { ProcessDevicesComponent } from './process-devices/process-devices.component';
import { PendingDevicesComponent } from './pending-devices/pending-devices.component';
import { UpdateDevicesComponent } from './update-devices/update-devices.component';
import { BorrowDevicesComponent } from './borrow-devices/borrow-devices.component';
import { BorrowedDevicesComponent } from './borrowed-devices/borrowed-devices.component';
import { AdminDevicesComponent } from './admin-devices/admin-devices.component';
import { UpdateActiveComponent } from './update-active/update-active.component';
import { AttachmentDevicesComponent } from './attachment-devices/attachment-devices.component';
import { AttachResourcesComponent } from './attach-resources/attach-resources.component';
import { AttachToDeviceComponent } from './attach-to-device/attach-to-device.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ViewDeviceComponent,
    DevicesListComponent,
    NextDevicesComponent,
    ProcessDevicesComponent,
    PendingDevicesComponent,
    UpdateDevicesComponent,
    BorrowDevicesComponent,
    BorrowedDevicesComponent,
    AdminDevicesComponent,
    UpdateActiveComponent,
    AttachmentDevicesComponent,
    AttachResourcesComponent,
    AttachToDeviceComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(DevicesRoutes),
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class DevicesModule { }
