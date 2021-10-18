import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ChartsRoutes } from './charts.routing';
import { NextCalibrationsComponent } from './next-calibrations/next-calibrations.component';
import { DoneCalibrationsComponent } from './done-calibrations/done-calibrations.component';
import { BorrowsOverallComponent } from './borrows-overall/borrows-overall.component';

@NgModule({
  declarations: [
    NextCalibrationsComponent,
    DoneCalibrationsComponent,
    BorrowsOverallComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ChartsRoutes),
  ]
})
export class ChartsModule { }
