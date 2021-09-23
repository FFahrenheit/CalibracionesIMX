import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartComponent } from './start/start.component';
import { GaugesRoutes } from './gauges.routing';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ReturnComponent } from './return/return.component';
import { DetailsComponent } from './details/details.component';

@NgModule({
  declarations: [
    StartComponent,
    ReturnComponent,
    DetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(GaugesRoutes)
  ]
})
export class GaugesModule { }
