import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { AuthRoutes } from './auth.routing';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { RecoverComponent } from './recover/recover.component';
import { AdLoginComponent } from './ad-login/ad-login.component';



@NgModule({
  declarations: [
    LoginComponent,
    RecoverComponent,
    AdLoginComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(AuthRoutes),
    ReactiveFormsModule,
    SharedModule
  ]
})
export class AuthModule { }
