import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { AlertComponent } from './alert/alert.component';

@NgModule({
  declarations: [
    AlertComponent,
    FooterComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AlertComponent,
    FooterComponent
  ]
})
export class SharedModule { }
