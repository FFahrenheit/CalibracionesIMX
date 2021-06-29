import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/shared/alert';

@Component({
  selector: 'app-calibrators',
  templateUrl: './calibrators.component.html',
  styleUrls: ['./calibrators.component.scss']
})
export class CalibratorsComponent implements OnInit {

  public form : FormGroup;
  public proveedores = []; 
  private archivo : File;

  constructor(private router  : Router,
              private alert   : AlertService,
              private fb      : FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre : ['',Validators.required],
      hasCertificado : [false, Validators.required],
      certificado : ['', Validators.required]
    });
  }

  next(){

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
      let proveedor = Object.create(null);
      proveedor.nombre = this.get('nombre').value;
      if(this.get('hasCertificado').value){
        proveedor.certificado = this.archivo;
      }
      this.proveedores.push(proveedor);
      console.log(this.proveedores);

      this.form.reset();
    }
  }

  public removeProveedor(i : number){
    this.proveedores.splice(i,1);
  }
}
