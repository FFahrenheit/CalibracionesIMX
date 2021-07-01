import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EditService } from 'src/app/services/edit.service';
import { AlertService } from 'src/app/shared/alert';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.scss']
})
export class ProvidersComponent implements OnInit {

  public form : FormGroup;
  public proveedores = [];
  public id; 
  private archivo : File;

  constructor(private router  : Router,
              private alert   : AlertService,
              private fb      : FormBuilder,
              private edit    : EditService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre : ['',Validators.required],
      hasCertificado : [false, Validators.required],
      certificado : ['', Validators.required]
    });

    this.loadProveedores();
  }

  ngOnDestroy(){
    this.edit.setProviders(this.proveedores);
    console.log(this.edit.get());
    this.router.navigate(['editar',this.edit.get().id, 'confirmar']);
  }

  private loadProveedores(){
    let device; 
    if((device = this.edit.get()) == null || device.id != this.edit.getId()){
      device = this.edit.getDevice();
    }
    this.id = device.id;

    device.proveedores?.forEach(p => {
      if(!p.id){
        if(p.certificado){
          this.proveedores.push({
            nombre: p.nombre,
            certificado: p.certificado.name ,
            new: true,
          });
        }else{
          this.proveedores.push({
            nombre: p.nombre,
            new: true
          });
        }
      }else{
        if(p.certificado){
          this.proveedores.push({
            nombre: p.nombre,
            certificado: 'ISO17025 - ' + p.nombre,
            id: p.id
          });
        }else{
          this.proveedores.push({
            nombre: p.nombre,
            id: p.id
          });
        }
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
        proveedor.new = true;
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

  public isFile(val){
    return typeof val != 'string';
  }

}
