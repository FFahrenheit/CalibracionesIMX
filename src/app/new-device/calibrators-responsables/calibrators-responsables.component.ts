import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { AlertService } from 'src/app/shared/alert';
import { UserInputComponent } from 'src/app/shared/user-input/user-input.component';

@Component({
  selector: 'app-calibrators-responsables',
  templateUrl: './calibrators-responsables.component.html',
  styleUrls: ['./calibrators-responsables.component.scss']
})
export class CalibratorsResponsablesComponent implements OnInit {

  public form : FormGroup;
  public responsables = [];
  public calibradores : String[] = [];

  public users;

  @ViewChild('usuario') usuario : UserInputComponent;

  constructor(private userService : UsersService,
              private fb          : FormBuilder,
              private alert       : AlertService) { }

  ngOnInit(): void {
    this.userService.getUsers()
    .subscribe((resp:any)=>{
      console.log(resp);
      if(resp['ok']){
        this.users = resp.usuarios;
        console.log(this.users);
      }
    },(error)=>{
      console.log('Error retrieving users');
      console.log(error);
    });

    this.form = this.fb.group({
      name: ['', Validators.required],
      username: [''],
      email: [''],
      calibrador: ['',Validators.required],
    });

  }

  public next(){
    if(this.calibradores.length > 0 && this.responsables.length > 0){

    }else{
      this.alert.warn('Agregue al menos un responsable y un calibrador');
    }
  }

  getValidity(){
    if (this.usuario != null){
      return this.usuario.getValidity();
    }
    return false;
  }

  public addUser(){
    if(this.getValidity()){
      const newElement = this.form.value;
      console.log(newElement);

      let repeated = false;
      this.responsables.forEach(e => {
        if(newElement.username == e.username){
          repeated = true;
        }
      });

      if(!repeated){
        this.responsables.push(newElement);
      }else{
        this.alert.warn(newElement.name + 'ya es responsable');
      }
      this.usuario.reset();
    }else{
      this.usuario.markAsTouched();
    }
  }

  public setValues(data){
    if(data != null && data.username != null){
      this.form.controls['name'].setValue(data.name);
      this.form.controls['username'].setValue(data.username);
      this.form.controls['email'].setValue(data.email);
      this.form.updateValueAndValidity({ onlySelf: true, emitEvent: true });

    }else{
      this.form.controls['name'].setValue('');
      this.form.controls['username'].setValue('');    
      this.form.controls['email'].setValue('');
      this.form.updateValueAndValidity({ onlySelf: true, emitEvent: true });
    }
  }

  public get(ctrl : string){
    return this.form.controls[ctrl];
  }

  public getClass(ctrl : string) : string { 
    if(!this.get(ctrl).touched){
      return '';
    }
    return this.get(ctrl).valid ? 'is-valid' : 'is-invalid';
  }

  addCalibrador(){
    let calibrador = this.get('calibrador');
    calibrador.markAsTouched();
    if(calibrador.valid){
      this.calibradores.push(calibrador.value);
      calibrador.setValue('');
      calibrador.markAsUntouched();
    }
  }

  public removeResponsable(index : number){
    this.responsables.splice(index,1);
  }

  public removeCalibrador(index : number){
    this.calibradores.splice(index,1);
  }
}
