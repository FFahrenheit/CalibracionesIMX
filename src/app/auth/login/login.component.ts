import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public form : FormGroup= Object.create(null);

  private returnUrl = '/';
  public showPassword = false;

  constructor(private fb      : FormBuilder,
              private router  : Router,
              private route   : ActivatedRoute) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: [localStorage.getItem('remember-user')||'', Validators.compose([Validators.required])],
      password: ["", Validators.compose([Validators.required])],
      remember: [false, Validators.compose([Validators.required])]
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  public onSubmit(){
    this.form.markAllAsTouched();
    if(this.form.valid){
      console.log('xd');
    }
  }

  public getClass(controlName : string) : string{
    let control = this.form.controls[controlName];
    if(!control.touched){
      return '';
    };
    return control.hasError('required') ? 'is-invalid' : 'is-valid';
  }
}