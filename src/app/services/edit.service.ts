import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { GetDeviceService } from './get-device.service';
import { UploadCertificateService } from './upload-certificate.service';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class EditService {
  
  private id : string;
  private device = null;
  private error = 'Error de servicio';

  constructor(private deviceService  : GetDeviceService,
              private http           : HttpClient,
              private upload         : UploadCertificateService) { }

  public editDevice() {
    let body = this.prepare();

    return this.http.put(`${base_url}/device/${this.id}`, body)
      .pipe(
        map
        (resp => {
          console.log(resp);
          if (resp['ok']) {
            return this.upload.uploadCertificates(this.device.proveedores,this.id)
                .subscribe(resp=>{
                  return resp;
                },error=>{
                  return false;
                });
          }else{
            this.error = 'Error al crear';
            return false;
          }
        }), catchError(error => {
          console.log(error);
          this.error = 'Error en servidor';
          return of(false);
        })
      )
  }

  public isValid(deviceId : string){
    this.id = deviceId;
    let device = this.deviceService.getDevice();
    if(device == null || device.id != deviceId){
      return this.deviceService.loadDevice(this.id);
    }
    this.device = device;
    return true;
  }

  public getDevice(){
    this.device = this.deviceService.getDevice();
    return this.device;
  }

  public get(){
    return this.device;
  }

  public setDetailChanges(device){
    Object.keys(device).forEach(key=>{
      this.device[key] = device[key];
    });
  }

  public setResponsables(responsables){
    this.device.responsables = [];
    responsables.forEach(r=>{
      this.device.responsables.push({
        nombre: r.name,
        username: r.username
      })
    })
  }

  public setVerificadores(verificadores){
    this.device.verificadores = [];
    verificadores.forEach(v=>{
      this.device.verificadores.push({
        nombre: v
      });
    })
  }

  public setProviders(providers){
    this.device.proveedores  = providers;
    this.device._proveedores = [];
    this.device.__proveedores = [];
    providers.forEach(p=>{
      console.log(p);
      if(p?.new && !p?.id){
        if(p?.certificado){
          this.device._proveedores.push({
            nombre: p.nombre,
            certificado: p.certificado
          });
        }else{
          this.device._proveedores.push({
            nombre: p.nombre,
          });
        }
      }else{
        this.device.__proveedores.push(p.id);
      }
    });
  }

  private prepare(){
    let responsables = [];
    this.device.responsables.forEach(r=>{
      responsables.push({
        equipo: this.id,
        usuario: r.username
      });
    });

    let verificadores = [];
    this.device.verificadores.forEach(v=>{
      verificadores.push({
        equipo: this.id,
        nombre: v.nombre
      });
    });

    this.setProviders(this.device.proveedores);
    let __proveedores = this.device.__proveedores;
    let _proveedores = [];
    this.device._proveedores?.forEach(p=>{
      _proveedores.push({
        nombre: p.nombre,
        equipo: this.id
      });
    });

    let equipo = Object.assign({}, this.device);

    let body = {
      equipo,
      responsables,
      verificadores,
      _proveedores,
      __proveedores,
    }

    delete body.equipo.nombrePrestatario;
    delete body.equipo.responsables;
    delete body.equipo.verificadores;
    delete body.equipo.proveedores;
    delete body.equipo._proveedores;
    delete body.equipo.__proveedores;
    delete body.equipo.calibraciones;

    return body;
  }

  public getError(){
    return this.error;
  }

  public getId(){
    return this.id;
  }
}
