import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { AlertService } from 'src/app/shared/alert';

@Component({
  selector: 'app-recover',
  templateUrl: './recover.component.html',
  styleUrls: ['./recover.component.scss']
})
export class RecoverComponent implements OnInit {

  public form : FormGroup = Object.create(null);

  constructor(private router  : Router,
              private fb      : FormBuilder,
              private alert   : AlertService,
              private login   : LoginService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      username : ['',Validators.compose([Validators.required])]
    });
  }

  public onSubmit() : void{
    this.form.markAllAsTouched();
    if(this.form.valid){
      this.alert.info('Enviando correo de recuperación');
      this.login.recoverPassowrd(this.form.controls['username'].value)
          .subscribe(resp=>{
            setTimeout(() => {
              if(resp){
                this.alert.success('Contraseña recuperada, revise su correo', { autoClose : false });
                setTimeout(() => {
                  this.router.navigate(['inicio','login']);
                }, 3000);
              }else{
                this.alert.error(this.login.getError());
              }
            }, 1500);
          },error=>{
            this.alert.error(this.login.getError());
          });
    }
  }

  public getClass(controlName : string) : string {
    let control = this.form.controls[controlName];
    if(!control.touched){
      return '';
    }
    return control.hasError('required') ? 'is-invalid' : 'is-valid';
  }

}
