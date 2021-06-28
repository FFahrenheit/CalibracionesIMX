import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { CrewRoutes } from './crew.routing';
import { BackupUsersComponent } from './backup-users/backup-users.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    BackupUsersComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(CrewRoutes)
  ]
})
export class CrewModule { }
