import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { UserInputComponent } from 'src/app/shared/user-input/user-input.component';

@Component({
  selector: 'app-backup-users',
  templateUrl: './backup-users.component.html',
  styleUrls: ['./backup-users.component.scss']
})
export class BackupUsersComponent implements OnInit {

  public form : FormGroup = Object.create(null);
  public users;

  public tests = [1,2,3,4,5];

  public validInput = false;

  @ViewChild('usuario') usuario : UserInputComponent;

  constructor(private fb          : FormBuilder,
              private userService : UsersService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      username: ['']
    });

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
  }

  public setValues(data){
    if(data != null && data.username != null){
      console.log('Valid!');
      this.validInput = true;
      this.form.controls['nombre'].setValue(data.name);
      this.form.controls['username'].setValue(data.username);
      this.form.updateValueAndValidity({ onlySelf: true, emitEvent: true });

    }else{
      console.log('Invalid');
      this.validInput = false;
      this.form.controls['nombre'].setValue('');
      this.form.controls['username'].setValue('');    
      this.form.updateValueAndValidity({ onlySelf: true, emitEvent: true });
    }
  }


  markAsTouched(){
    this.form.markAllAsTouched();
    this.usuario.markAsTouched();
  }

  getValidity(){
    if (this.usuario != null){
      return this.usuario.getValidity();
    }
    return false;
  }

  public addUser(){
    if(this.getValidity()){
      //Meh
    }else{
      this.usuario.markAsTouched();
    }
  }

  public confirm(){
    console.log('Here we go...');
  }

}
