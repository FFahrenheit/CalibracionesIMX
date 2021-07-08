import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ChangePasswordService } from 'src/app/services/change-password.service';
import { AlertService } from 'src/app/shared/alert';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  public form;

  constructor(private fb : FormBuilder,
              private alert : AlertService,
              private changePassword : ChangePasswordService,
              private router : Router) { }

  ngOnInit(): void {

    this.form = this.fb.group({
      password : ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      confirm : ['', Validators.compose([Validators.required])]
    });
  }

  isLocked(){
    return !this.changePassword.canNavigate();
  }

  passwordValid(){
    if(!this.form.controls['password'].touched){
      return '';    
    }
    return this.form.controls['password'].valid ? 'is-valid' : 'is-invalid';
  }

  confirmPassword(){
    if(!this.form.controls['confirm'].touched){
      return '';
    }
    return this.form.controls['confirm'].valid && this.form.controls['password'].valid &&
           this.form.controls['confirm'].value == this.form.controls['password'].value ? 
           'is-valid' : 'is-invalid';
  }

  get(control : string){
    return this.form.controls[control];
  }

  needsPassword(){
    let control = this.get('password');
    return control.touched && control.hasError('required');
  }

  regex(){
    let control = this.get('password');
    return control.touched && (control.value == null || control.value.length < 6);
  }

  passwordMatch(){
    let control = this.get('confirm');
    let compare = this.get('password');
    return control.touched && control.value != compare.value;
  }

  needsConfirm(){
    let control = this.get('confirm');
    return control.touched && control.hasError('required');
  }

  next(){
    console.log(this.get('password').touched)
    if(this.form.valid && !this.passwordMatch()){
      this.alert.info("Cambiando contraseña...");
      setTimeout(() => {
        this.changePassword.changePassword(this.form.value)
            .subscribe(resp=>{
              if(resp){
                let message = "Contraseña cambiada";
                if(!this.changePassword.canNavigate()){
                  message += ". Puedes usar el sistema ahora";
                }
                this.alert.success(message, { autoClose : false });
                this.changePassword.deactivateGuard();
                setTimeout(() => {
                  // this.form.reset();
                  // this.form.updateValueAndValidity();
                  this.router.navigate(['']);
                }, 3000);
              }else{
                this.alert.error(this.changePassword.getError());
              }
            },error=>{
              this.alert.error(this.changePassword.getError());
            })
      }, 2000);
    }else{
      this.form.markAllAsTouched();
    }
  }

}
