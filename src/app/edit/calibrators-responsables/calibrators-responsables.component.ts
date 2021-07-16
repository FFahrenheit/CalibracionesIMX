import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EditService } from 'src/app/services/edit.service';
import { NavigationService } from 'src/app/services/navigation.service';
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
  public verificadores : string[] = [];

  public id;

  public users;

  @ViewChild('usuario') usuario : UserInputComponent;

  constructor(private userService : UsersService,
              private fb          : FormBuilder,
              private alert       : AlertService,
              private router      : Router,
              private edit        : EditService,
              private nav         : NavigationService) { }

  ngOnInit(): void {
    this.nav.reactivate();
    this.userService.getUsers()
    .subscribe((resp:any)=>{
      console.log(resp);
      if(resp['ok']){
        this.users = resp.usuarios;
      }
    },(error)=>{
      console.log('Error retrieving users');
      console.log(error);
    });

    this.form = this.fb.group({
      name: ['', Validators.required],
      username: [''],
      calibrador: ['',Validators.required],
    });

    this.setDefaults()

  }

  private setDefaults(){
    let device; 
    if((device = this.edit.get()) == null || device.id != this.edit.getId()){
      device = this.edit.getDevice();
    }
    this.id = device.id;

    device.responsables?.forEach(r=>{
      const resp = {
        name: r.nombre,
        username: r.username
      };
      this.responsables.push(resp);
    });

    if(device?.verificadores?.length > 0){
      this.verificadores = device?.verificadores?.map( d => d.nombre);
    }  
  }

  ngOnDestroy(){
    this.edit.setResponsables(this.responsables);
    this.edit.setVerificadores(this.verificadores);
    console.log(this.edit.get());
    this.edit.setProviders([]);
    console.log(this.edit.get());
    this.router.navigate(['editar',this.edit.get().id, 'confirmar']);
    // this.router.navigate(['editar',this.edit.get().id,'proveedores']);
  }

  public next(){
    if(this.verificadores.length > 0 && this.responsables.length > 0){
      this.ngOnDestroy();
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
      this.form.updateValueAndValidity({ onlySelf: true, emitEvent: true });

    }else{
      this.form.controls['name'].setValue('');
      this.form.controls['username'].setValue('');    
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
      if(this.verificadores.includes(calibrador.value)){
        this.alert.warn(calibrador.value + ' ya agregado')
      }else{
        this.verificadores.push(calibrador.value);
        calibrador.setValue('');
        calibrador.markAsUntouched();
      }
    }
  }

  public removeResponsable(index : number){
    this.responsables.splice(index,1);
  }

  public removeCalibrador(index : number){
    this.verificadores.splice(index,1);
  }

  public back(){
    this.nav.navigateWithPermission(['editar',this.id ,'detalles']);
  }
}
