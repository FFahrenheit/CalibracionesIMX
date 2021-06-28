import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrewService } from 'src/app/services/crew.service';
import { LoginService } from 'src/app/services/login.service';
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
  public myUser;
  public changesDone = 0;

  public validInput = false;

  @ViewChild('usuario') usuario : UserInputComponent;

  constructor(private fb          : FormBuilder,
              private userService : UsersService,
              private crewService : CrewService,
              private alert       : AlertService,
              private user        : LoginService) { }

  ngOnInit(): void {
    this.myUser = this.user.getLoggedUser().username;

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
    if(data != null && data.username != null){
      this.validInput = true;
      this.form.controls['name'].setValue(data.name);
      this.form.controls['username'].setValue(data.username);
      this.form.controls['email'].setValue(data.email);
      this.form.updateValueAndValidity({ onlySelf: true, emitEvent: true });

    }else{
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
        this.alert.info(newElement.name + ' añadido');
        this.encargados.push(newElement);
        this.changesDone += 1;
      }else{
        this.alert.warn(newElement.name + 'ya es encargado');
      }
      this.usuario.reset();
    }else{
      this.usuario.markAsTouched();
    }
  }

  public confirm(){
    let list = this.encargados.map(e => e.username);
    this.crewService.updateEncargados(list)
        .subscribe(resp=>{
          if(resp){
            this.alert.success('Lista actualizada');
            setTimeout(() => {
              window.location.reload();
            }, 2500);
          }else{
            this.alert.error(this.crewService.getError());
          }
        },error=>{
          this.alert.error(this.crewService.getError());
        })
  }

  remove(index : number){
    this.alert.info(this.encargados[index].name + ' removido')
    this.encargados.splice(index,1);
    this.changesDone += 1;
  }

}
