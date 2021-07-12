import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Calibracion, Device } from 'src/app/interfaces/new-device.interface';
import { activos, estados, ubicaciones } from 'src/app/resources/device.component.statuses';
import { FixedInputsService } from 'src/app/services/fixed-inputs.service';
import { LoginService } from 'src/app/services/login.service';
import { NewDeviceService } from 'src/app/services/new-device.service';
import { AlertService } from 'src/app/shared/alert';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {

  public form : FormGroup;

  public estados = estados;
  public activos = activos;
  public _ubicaciones = ubicaciones;

  public ubicaciones = [];
  public defaultLocation = '';

  constructor(private fb            : FormBuilder,
              private alert         : AlertService,
              private router        : Router,
              private create        : NewDeviceService,
              private login         : LoginService,
              private getterService : FixedInputsService) { }

  ngOnInit(): void {
    let saved = this.create.getDevice();

    this.form = this.fb.group({
      descripcion : [saved?.descripcion || '', Validators.required],
      serie : [saved?.serie || '', Validators.required],
      ubicacion : [saved?.ubicacion || '', Validators.required],
      calibracion : [saved?.calibracion || 'INTERNO', Validators.required],
      error : [saved?.error || ''],
      resInf : [saved?.resInf || ''],
      resSup : [saved?.resSup ||''],
      periodo : [saved?.periodo || '', Validators.compose([Validators.required, Validators.min(1)])],
      fechaCalibracion : [saved?.calibraciones[0]?.fecha || '',Validators.required],
      calibradorCalibracion : [saved?.calibraciones[0]?.calibrador || '', Validators.required],
      activo : [saved?.activo || '', Validators.required],    //MUST BE ''
      estado : [saved?.estado || '', Validators.required]
    });

    this.defaultLocation = saved?.ubicacion || '';

    this.getterService.loadLocations()
    .subscribe(resp=>{
      if(resp){
        this.ubicaciones = this.getterService.getLocations();
              }else{
        console.log(this.getterService.getError());
      }
    },error=>{
      console.log(this.getterService.getError());
    });

  }

  ngOnDestroy(){
    this.create.setDetails(this.getForm());
    this.create.setCalibraciones(this.getCalibrations());
    console.log(this.create.getDevice());

    this.router.navigate(['nuevo','responsables']);
  }

  private getCalibrations() : Calibracion[]{
    const calibracion : Calibracion = {
      fecha : this.get('fechaCalibracion').value,
      calibrador: this.get('calibradorCalibracion').value,
      verificador: this.login.getLoggedUser().username,
      verifico: this.login.getLoggedUser().nombre
    };

    return [ calibracion ]; 
  }

  private getForm() : Device{
    let device : Device = {
      id : 'Nuevo',
      serie : this.get('serie').value,
      descripcion: this.get('descripcion').value,
      ubicacion: this.get('ubicacion').value,
      calibracion: this.get('calibracion').value,
      error: this.getValue('error'),
      periodo: this.get('periodo').value,
      resInf: this.getValue('resInf'),
      resSup: this.getValue('resSup'),
      ultima: this.get('fechaCalibracion').value,
      activo: this.get('activo').value,
      estado: this.get('estado').value
    };

    return device;
  }

  getValue(ctrl : string) : string{
    return this.get(ctrl).value != null && this.get(ctrl).value != '' ? this.get(ctrl).value : 'N/A';
  }

  get(ctrl : string){
    return this.form.controls[ctrl];
  }

  public getClass(ctrl : string) : string{
    if(!this.get(ctrl).touched){
      return '';
    }
    return this.get(ctrl).valid ? 'is-valid' : 'is-invalid';
  }

  public next(){
    this.form.markAllAsTouched();
    if(this.form.valid){
      this.ngOnDestroy();
    }else{
      this.alert.warn('Complete los campos necesarios');
    }
  }

  public updateUbicacion(value : string){
    this.form.controls['ubicacion'].setValue(value);
  }
}
