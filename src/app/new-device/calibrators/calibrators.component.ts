import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Proveedor } from 'src/app/interfaces/new-device.interface';
import { NewDeviceService } from 'src/app/services/new-device.service';
import { AlertService } from 'src/app/shared/alert';

@Component({
  selector: 'app-calibrators',
  templateUrl: './calibrators.component.html',
  styleUrls: ['./calibrators.component.scss']
})
export class CalibratorsComponent implements OnInit, OnDestroy {

  public form : FormGroup;
  public proveedores = []; 
  private archivo : File;

  constructor(private router  : Router,
              private alert   : AlertService,
              private fb      : FormBuilder,
              private create  : NewDeviceService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre : ['',Validators.required],
      hasCertificado : [false, Validators.required],
      certificado : ['', Validators.required]
    });

    this.loadProveedores();
  }

  ngOnDestroy(){
    this.create.setProveedores(this.getProveedores());
    console.log(this.create.getDevice());
    this.router.navigate(['nuevo','confirmar']);
  }

  private getProveedores() : Proveedor[]{
    let proveedores : Proveedor[] = []
    this.proveedores.forEach(p=>{
      let proveedor : Proveedor = {
        nombre: p.nombre
      };
      if(p.certificado){
        proveedor.certificado = p.certificado;
      }
      proveedores.push(proveedor);
    });

    return proveedores;
  }

  private loadProveedores(){
    let device = this.create.getDevice();
    device.proveedores?.forEach(p => {
      if(p.certificado){
        this.proveedores.push({
          nombre: p.nombre,
          certificado: p.certificado
        });
      }else{
        this.proveedores.push({
          nombre: p.nombre
        });
      }
    });
  }

  next(){
    this.ngOnDestroy();
  }

  public certificateEvent($event){
    if($event.target.files.length > 0) {
      this.archivo = $event.target.files[0];
    }
  }

  public get(ctrl){
    return this.form.controls[ctrl];
  }

  public getClass(ctrl : string) : string{
    if(!this.get(ctrl).touched){
      return ''
    }
    return this.get(ctrl).valid ? 'is-valid' : 'is-invalid';
  }

  public getValidity(){
    if(!this.get('nombre').valid){
      return 'no-ok btn-secondary';
    }
    if(!this.get('hasCertificado').value){
      return 'btn-success';
    }
    if(this.get('certificado').value){
      return 'btn-success';
    }
    return 'no-ok btn-secondary';
  }

  public isValid(){
    if(!this.get('nombre').valid){
      return false;
    }
    if(!this.get('hasCertificado').value){
      return true;
    }
    if(this.get('certificado').value){
      return true;
    }
    return true;
  }

  addProveedor(){
    this.form.markAllAsTouched();
    if(this.isValid()){
      let repeated = false;
      let nombre = this.get('nombre').value;
      this.proveedores.forEach(p=>{
        if(p.nombre == nombre){
          repeated = true;
        }
      });

      if(!repeated){
        let proveedor = Object.create(null);
        proveedor.nombre = nombre;
        if(this.get('hasCertificado').value){
          proveedor.certificado = this.archivo;
        }
        this.proveedores.push(proveedor);
  
        this.form.reset();
      }else{
        this.alert.warn(nombre + ' ya registrado');
      }
    }
  }

  public removeProveedor(i : number){
    this.proveedores.splice(i,1);
  }
}
