import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangePasswordService } from 'src/app/services/change-password.service';
import { LoginService } from 'src/app/services/login.service';
import { AlertService } from 'src/app/shared/alert';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public form : FormGroup= Object.create(null);

  private returnUrl : any = '/' ;
  public showPassword = false;

  constructor(private fb      : FormBuilder,
              private router  : Router,
              private route   : ActivatedRoute,
              private login   : LoginService,
              private alert   : AlertService,
              // private winLogin: WindowsAuthService,
              private change  : ChangePasswordService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: [localStorage.getItem('remember-user')||'', Validators.compose([Validators.required])],
      password: ["", Validators.compose([Validators.required])],
      remember: [false, Validators.compose([Validators.required])]
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    // this.winLogin.init();
  }

  public onSubmit(){
    this.alert.clear();
    this.form.markAllAsTouched();
    if(this.form.valid){
      let username = this.form.controls['username'].value;
      let password = this.form.controls['password'].value;
      this.login.login(username,password).subscribe(
        resp=>{
          /* Save logged user */
          if(resp == null || resp){
            if(this.form.controls['remember'].value){
              localStorage.setItem("remember-user",username);
            }
            else{
              if(localStorage.getItem("remember-user") == username){
                localStorage.removeItem("remember-user");
              }
            }
          } 
          if(resp == null){
            this.change.activateGuard();
            this.router.navigate(['usuarios','seguridad','cambiar']);
          }
          else if(resp){
            this.router.navigateByUrl(this.returnUrl);
          }else{
            this.alert.error(this.login.getError(), { autoClose: false });
            this.form.controls['password'].setValue('');
          }
        },
        error=>{
          this.alert.warn(this.login.getError(), { autoClose: false });
        }
      )
    }
  }

  public getClass(controlName : string) : string{
    let control = this.form.controls[controlName];
    if(!control.touched){
      return '';
    };
    return control.hasError('required') ? 'is-invalid' : 'is-valid';
  }

  public windowsLogin(){
    return this.router.navigate(['inicio','windows']);
    this.alert.info('Intentando autenticación...');
    setTimeout(()=>{
      // this.winLogin.login();
    }, 10)
  }
}