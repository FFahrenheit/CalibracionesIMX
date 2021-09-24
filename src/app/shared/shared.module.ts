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
import { DeviceBorrowsComponent } from './device-borrows/device-borrows.component';
import { UserInputComponent } from './user-input/user-input.component';
import { ProfileViewComponent } from './profile-view/profile-view.component';
import { DefaultInputComponent } from './default-input/default-input.component';
import { DeviceOptionsComponent } from './device-options/device-options.component';
import { GaugeComponent } from './gauge/gauge.component';
import { DeviceSimpleComponent } from './device-simple/device-simple.component';

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
    DeviceBorrowsComponent,
    UserInputComponent,
    ProfileViewComponent,
    DefaultInputComponent,
    DeviceOptionsComponent,
    GaugeComponent,
    DeviceSimpleComponent,
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
    FileUploadComponent,
    DeviceBorrowsComponent,
    UserInputComponent,
    ProfileViewComponent,
    DefaultInputComponent,
    GaugeComponent
  ]
})
export class SharedModule { }
