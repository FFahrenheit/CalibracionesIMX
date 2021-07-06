import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GetDeviceService } from 'src/app/services/get-device.service';
import { ProvidersService } from 'src/app/services/providers.service';
import { AlertService } from 'src/app/shared/alert';

@Component({
  selector: 'app-provider-list',
  templateUrl: './provider-list.component.html',
  styleUrls: ['./provider-list.component.scss']
})
export class ProviderListComponent implements OnInit {

  public form : FormGroup;
  public proveedores = [];
  private archivo : File;
  private deleted = [];
  public cambios = 0;

  constructor(private alert     : AlertService,
              private fb        : FormBuilder,
              private providers : ProvidersService,
              private getDevice : GetDeviceService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre : ['',Validators.required],
      hasCertificado : [false, Validators.required],
      certificado : ['', Validators.required]
    });

    this.loadProveedores();
  }

  private loadProveedores(){
    this.providers.loadProviders()
    .subscribe(resp=>{
      if(resp){
        let proveedores = this.providers.getProviders().map( p => ({...p, new: false}));
        console.table(proveedores);
        this.proveedores = proveedores;
      }else{
        this.alert.error(this.providers.getError());
      }
    },error=>{
      this.alert.error(this.providers.getError());
    });
  }

  next(){
    console.log('Okay!');
    let proveedores = this.prepare();
    this.providers.updateProviders(proveedores,this.deleted)
        .subscribe(resp=>{
          if(resp){
            this.alert.success('Proveedores actualizados');
            setTimeout(() => {
              window.location.reload();
            }, 2500);
          }else{
              this.alert.error(this.providers.getError());
          }
        },error=>{
          this.alert.error(this.providers.getError());
        });
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
        this.cambios++;
      }else{
        this.alert.warn(nombre + ' ya registrado');
      }
    }
  }

  public removeProveedor(i : number){
    let removed = this.proveedores.splice(i,1);
    this.deleted.push(removed[0].id);
    this.cambios++;
  }

  public isFile(val){
    return typeof val != 'string';
  }

  public prepare(){
    let providers = [];
    this.proveedores.forEach(p=>{
      if(p.new){
        let prov = p;
        if(!prov.certificado){
          prov.certificado = null;
        }
        // delete prov.new;
        providers.push(prov);
      }
    });
    console.log({providers});
    return providers;
  }

  public seeCertificate(provider){
    return this.getDevice.downloadFile(provider.certificado);
  }

}
