import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartComponent } from './start/start.component';
import { GaugesRoutes } from './gauges.routing';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    StartComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(GaugesRoutes)
  ]
})
export class GaugesModule { }
