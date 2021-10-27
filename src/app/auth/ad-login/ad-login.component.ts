import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  private returnUrl : string;

  constructor(private fb      : FormBuilder,
              private adLogin : AdLoginService,
              private alert   : AlertService,
              private change  : ChangePasswordService,
              private router  : Router,
              private route   : ActivatedRoute) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: [localStorage.getItem('remember-user')||'', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])]
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
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

  public ADLogin(){
    this.alert.info('Iniciando autenticación...', { autoClose: false });
    this.adLogin.connectWithSSO().subscribe(resp=>{
      this.alert.clear();
      if(resp == null){
        this.change.activateGuard();
        this.router.navigate(['usuarios','seguridad','cambiar']);
      }else if(resp){
        this.alert.success('Autenticación correcta');
        setTimeout(() => {
          this.router.navigateByUrl(this.returnUrl);
        }, 2500);
      }else{
        this.alert.error(this.adLogin.getError());
        this.get('password').setValue('');
      }
    },error=>{
      this.alert.error(this.adLogin.getError());
    });
  }

  public loginAs(username : string, password : string){

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
