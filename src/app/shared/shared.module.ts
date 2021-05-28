import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { AlertComponent } from './alert/alert.component';
import { AttributeComponent } from './attribute/attribute.component';
import { DeviceComponent } from './device/device.component';

@NgModule({
  declarations: [
    AlertComponent,
    FooterComponent,
    AttributeComponent,
    DeviceComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AlertComponent,
    FooterComponent,
    DeviceComponent
  ]
})
export class SharedModule { }
