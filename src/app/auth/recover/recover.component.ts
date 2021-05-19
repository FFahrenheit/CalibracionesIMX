import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recover',
  templateUrl: './recover.component.html',
  styleUrls: ['./recover.component.scss']
})
export class RecoverComponent implements OnInit {

  public form : FormGroup = Object.create(null);
  public submitted = false;

  constructor(private router  : Router,
              private fb      : FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      username : ['',Validators.compose([Validators.required])]
    });
  }

  public onSubmit() : void{
    this.form.markAllAsTouched();
    if(this.form.valid){
      console.log('Lets see');
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
