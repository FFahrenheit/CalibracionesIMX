import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { AlertComponent } from './alert/alert.component';
import { AttributeComponent } from './attribute/attribute.component';
import { DeviceComponent } from './device/device.component';
import { PipesModule } from '../pipes/pipes.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ErrorMessageComponent } from './error-message/error-message.component';

@NgModule({
  declarations: [
    AlertComponent,
    FooterComponent,
    AttributeComponent,
    DeviceComponent,
    ErrorMessageComponent,
  ],
  imports: [
    CommonModule,
    PipesModule.forRoot(),
    NgbModule,
  ],
  exports: [
    AlertComponent,
    FooterComponent,
    DeviceComponent,
    ErrorMessageComponent
  ]
})
export class SharedModule { }
