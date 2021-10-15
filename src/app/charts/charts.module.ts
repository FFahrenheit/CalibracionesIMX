import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ChartsRoutes } from './charts.routing';
import { NextCalibrationsComponent } from './next-calibrations/next-calibrations.component';

@NgModule({
  declarations: [
    NextCalibrationsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ChartsRoutes),
  ]
})
export class ChartsModule { }
