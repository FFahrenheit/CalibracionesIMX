import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { EditRoutes } from './edit.routing';
import { ReactiveFormsModule } from '@angular/forms';
import { BeginComponent } from './begin/begin.component';



@NgModule({
  declarations: [
    BeginComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(EditRoutes)
  ]
})
export class EditModule { }
