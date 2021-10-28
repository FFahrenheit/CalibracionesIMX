import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdLoginService } from 'src/app/services/ad-login.service';
import { ChangePasswordService } from 'src/app/services/change-password.service';
import { AlertService } from 'src/app/shared/alert';

@Component({
  selector: 'app-ad-login',
  templateUrl: './ad-login.component.html',
  styleUrls: ['./ad-login.component.scss']
})
export class AdLoginComponent implements OnInit {

  public form : FormGroup;
  public showPassword = false;

  constructor(private fb      : FormBuilder,
              private adLogin : AdLoginService,
              private alert   : AlertService,
              private change  : ChangePasswordService,
              private router  : Router) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: [localStorage.getItem('remember-user')||'', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])]
    });
  }

  public get(ctrl : string) : AbstractControl{
    return this.form.controls[ctrl];
  }

  public getClass(controlName : string) : string{
    let control = this.get(controlName);
    if(!control.touched){
      return '';
    };
    return control.hasError('required') ? 'is-invalid' : 'is-valid';
  }

  public checkLogin(resp){
    this.alert.clear();
    if(resp == null){
      this.change.activateGuard();
      this.router.navigate(['usuarios','seguridad','cambiar']);
    }else if(resp){
      this.alert.success('Autenticación correcta');
      setTimeout(() => {
        this.router.navigate(['']);
      }, 2500);
    }else{
      this.alert.error(this.adLogin.getError());
      this.get('password').setValue('');
    }
  }

  public ADLogin(){
    this.alert.info('Iniciando autenticación...', { autoClose: false });
    this.adLogin.connectWithSSO().subscribe(resp=>{
      this.checkLogin(resp);
    },error=>{
      this.alert.error(this.adLogin.getError());
    });
  }

  public loginAs(username : string, password : string){
    this.adLogin.connectWithCredentials(username, password)
        .subscribe(resp=> {
          this.checkLogin(resp);
        }, error => {
          this.alert.error(this.adLogin.getError());
        });
  }

  public onSubmit(){
    this.alert.clear();
    this.form.markAllAsTouched();
    
    if(this.form.valid){
      this.alert.info('Iniciando autenticación...', {autoclose: false });
      this.loginAs(this.get('username').value, this.get('password').value);  
    }
  }

}
