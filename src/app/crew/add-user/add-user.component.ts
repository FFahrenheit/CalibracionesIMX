import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrewService } from 'src/app/services/crew.service';
import { AlertService } from 'src/app/shared/alert';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  
  public form : FormGroup = Object.create(null);

  constructor(private fb    : FormBuilder,
              private alert : AlertService,
              private crew  : CrewService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ['',Validators.required],
      username: ['',Validators.required],
      email: ['', Validators.compose([Validators.required,Validators.email])],
      password: ['', Validators.compose([Validators.required,Validators.minLength(6)])],
      posicion: ['', Validators.required],
      temporal: ['']
    });
  }

  get(control : string) : AbstractControl{
    return this.form.controls[control];
  }

  public getClass(ctrl : string){
    if(!this.get(ctrl).touched){
      return '';
    }
    return this.get(ctrl).valid ? 'is-valid' : 'is-invalid';
  }

  public next(){
    this.get('temporal').setValue(this.get('password').value);
    this.crew.addUser(this.form.value)
        .subscribe(resp=>{
          if(resp){
            this.alert.success(this.get('nombre').value + ' agregado', { autoClose : false });
            this.form.reset();
          }else{
            this.alert.error(this.crew.getError());
          }
        },error=>{
          this.alert.error(this.crew.getError());
        });    
  }
}
