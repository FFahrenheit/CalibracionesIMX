import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BorrowDetailsComponent } from './borrow-details/borrow-details.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { BorrowingsRoutes } from './borrowings.routes';
import { ReactiveFormsModule } from '@angular/forms';
import { LendDeviceComponent } from './lend-device/lend-device.component';
import { ReturnDeviceComponent } from './return-device/return-device.component';



@NgModule({
  declarations: [
    BorrowDetailsComponent,
    LendDeviceComponent,
    ReturnDeviceComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(BorrowingsRoutes)
  ]
})
export class BorrowingsModule { }
