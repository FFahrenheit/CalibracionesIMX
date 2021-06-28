import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { CrewRoutes } from './crew.routing';
import { BackupUsersComponent } from './backup-users/backup-users.component';

@NgModule({
  declarations: [
    BackupUsersComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(CrewRoutes)
  ]
})
export class CrewModule { }
