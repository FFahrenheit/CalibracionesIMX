import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { CrewRoutes } from './crew.routing';
import { BackupUsersComponent } from './backup-users/backup-users.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ProviderListComponent } from './provider-list/provider-list.component';
import { SeeProvidersComponent } from './see-providers/see-providers.component';
import { AddUserComponent } from './add-user/add-user.component';
import { DeleteRecordsComponent } from './delete-records/delete-records.component';
import { ResendTasksComponent } from './resend-tasks/resend-tasks.component';

@NgModule({
  declarations: [
    BackupUsersComponent,
    ChangePasswordComponent,
    ProviderListComponent,
    SeeProvidersComponent,
    AddUserComponent,
    DeleteRecordsComponent,
    ResendTasksComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(CrewRoutes)
  ]
})
export class CrewModule { }
