import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { activos, estados, ubicaciones } from 'src/app/resources/device.component.statuses';
import { EditService } from 'src/app/services/edit.service';
import { FixedInputsService } from 'src/app/services/fixed-inputs.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { AlertService } from 'src/app/shared/alert';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  public form : FormGroup = Object.create(null);

  public activos = activos;
  public estados = estados;
  public _ubicaciones = ubicaciones;
  public id : string;

  public ubicaciones = [];
  public defaultLocation = '';

  constructor(private router        : Router,
              private edit          : EditService,
              private fb            : FormBuilder,
              private alert         : AlertService,
              private getterService : FixedInputsService,
              private navigation    : NavigationService) { }

  ngOnInit(): void {
    this.navigation.reactivate();
    let saved; 
    if((saved = this.edit.get()) == null || saved.id != this.edit.getId()){
      saved = this.edit.getDevice();
    }    
    this.id = saved.id;
    this.form = this.fb.group({
      descripcion : [saved?.descripcion || '', Validators.required],
      serie : [saved?.serie || '', Validators.required],
      ubicacion : [saved?.ubicacion || '', Validators.required],
      calibracion : [saved?.calibracion || 'INTERNO', Validators.required],
      error : [saved?.error || ''],
      resInf : [saved?.resInf || ''],
      resSup : [saved?.resSup ||''],
      periodo : [saved?.periodo || '', Validators.compose([Validators.required, Validators.min(1)])],
      activo : [saved?.activo || '', Validators.required],
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
    this.edit.setDetailChanges(this.getForm());
    console.log(this.edit.get());
    this.router.navigate(['editar', this.edit.get().id ,'responsables']);
  }


  private getForm() {
    let device  = {
      serie : this.get('serie').value,
      descripcion: this.get('descripcion').value,
      ubicacion: this.get('ubicacion').value,
      calibracion: this.get('calibracion').value,
      error: this.getValue('error'),
      periodo: this.get('periodo').value,
      resInf: this.getValue('resInf'),
      resSup: this.getValue('resSup'),
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

  public isFixture() : boolean{
    return this.id.startsWith('FIX');
  }

  public attachReferences() : void{
    this.router.navigate(['equipos', 'adjuntar', this.id]);
  }

}
