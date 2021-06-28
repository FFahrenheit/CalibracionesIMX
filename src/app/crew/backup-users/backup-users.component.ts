import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrewService } from 'src/app/services/crew.service';
import { UsersService } from 'src/app/services/users.service';
import { AlertService } from 'src/app/shared/alert';
import { UserInputComponent } from 'src/app/shared/user-input/user-input.component';

@Component({
  selector: 'app-backup-users',
  templateUrl: './backup-users.component.html',
  styleUrls: ['./backup-users.component.scss']
})
export class BackupUsersComponent implements OnInit {

  public form : FormGroup = Object.create(null);
  public users;
  public show = false;
  public encargados;

  public tests = [1,2,3,4,5];

  public validInput = false;

  @ViewChild('usuario') usuario : UserInputComponent;

  constructor(private fb          : FormBuilder,
              private userService : UsersService,
              private crewService : CrewService,
              private alert       : AlertService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      username: [''],
      email: ['']
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

    this.crewService.loadEncargados()
        .subscribe(resp=>{
          if(resp){
            this.show = true;
            this.encargados = this.crewService.getEncargados();
          }else{
            this.alert.error('No se han podido cargar los encargados');
          }
        },error=>{
          this.alert.error('Error de servidor');
        });
  }

  public setValues(data){
    console.log(data);
    if(data != null && data.username != null){
      console.log('Valid!');
      this.validInput = true;
      this.form.controls['name'].setValue(data.name);
      this.form.controls['username'].setValue(data.username);
      this.form.controls['email'].setValue(data.email);
      this.form.updateValueAndValidity({ onlySelf: true, emitEvent: true });

    }else{
      console.log('Invalid');
      this.validInput = false;
      this.form.controls['name'].setValue('');
      this.form.controls['username'].setValue('');    
      this.form.controls['email'].setValue('');
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
      const newElement = this.form.value;
      console.log(newElement);

      let repeated = false;
      this.encargados.forEach(e => {
        if(newElement.username == e.username){
          repeated = true;
        }
      });

      if(!repeated){
        this.alert.info('Usuario añadido');
        this.encargados.push(newElement);
      }else{
        this.alert.warn('El usuario ya es encargado');
      }
      this.usuario.reset();
    }else{
      this.usuario.markAsTouched();
    }
  }

  public confirm(){
    console.log('Here we go...');
  }

}
