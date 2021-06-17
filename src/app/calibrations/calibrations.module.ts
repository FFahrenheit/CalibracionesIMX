import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { CalibrationsRoutes } from './calibrations.routing';
import { BeginCalibrationComponent } from './begin-calibration/begin-calibration.component';
import { UpdateStatusComponent } from './update-status/update-status.component';
import { ConfirmCalibrationComponent } from './confirm-calibration/confirm-calibration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    BeginCalibrationComponent,
    UpdateStatusComponent,
    ConfirmCalibrationComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(CalibrationsRoutes),
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class CalibrationsModule { }
