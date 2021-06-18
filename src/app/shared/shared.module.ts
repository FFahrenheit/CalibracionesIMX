import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { AlertComponent } from './alert/alert.component';
import { AttributeComponent } from './attribute/attribute.component';
import { DeviceComponent } from './device/device.component';
import { PipesModule } from '../pipes/pipes.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ErrorMessageComponent } from './error-message/error-message.component';
import { FilterModalComponent } from './filter-modal/filter-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SortDirective } from '../directives/sort.directive';
import { StatusModalComponent } from './status-modal/status-modal.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { ConfirmCalibrationModalComponent } from './confirm-calibration-modal/confirm-calibration-modal.component';
import { FileUploadComponent } from './file-upload/file-upload.component';

@NgModule({
  declarations: [
    AlertComponent,
    FooterComponent,
    AttributeComponent,
    DeviceComponent,
    ErrorMessageComponent,
    FilterModalComponent,
    SortDirective,
    StatusModalComponent,
    ConfirmModalComponent,
    ConfirmCalibrationModalComponent,
    FileUploadComponent,
  ],
  imports: [
    CommonModule,
    PipesModule.forRoot(),
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    AlertComponent,
    FooterComponent,
    DeviceComponent,
    ErrorMessageComponent,
    FilterModalComponent,
    SortDirective,
    StatusModalComponent,
    ConfirmModalComponent,
    ConfirmCalibrationModalComponent,
    FileUploadComponent
  ]
})
export class SharedModule { }
