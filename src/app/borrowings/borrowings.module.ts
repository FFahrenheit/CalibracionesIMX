import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BorrowDetailsComponent } from './borrow-details/borrow-details.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { BorrowingsRoutes } from './borrowings.routes';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    BorrowDetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(BorrowingsRoutes)
  ]
})
export class BorrowingsModule { }
