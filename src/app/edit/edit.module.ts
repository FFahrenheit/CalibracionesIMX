import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { EditRoutes } from './edit.routing';
import { ReactiveFormsModule } from '@angular/forms';
import { BeginComponent } from './begin/begin.component';
import { DetailsComponent } from './details/details.component';
import { CalibratorsResponsablesComponent } from './calibrators-responsables/calibrators-responsables.component';

@NgModule({
  declarations: [
    BeginComponent,
    DetailsComponent,
    CalibratorsResponsablesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(EditRoutes)
  ]
})
export class EditModule { }
