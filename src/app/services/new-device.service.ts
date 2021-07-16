import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Calibracion, Device, Proveedor, Responsable, Verificacion } from '../interfaces/new-device.interface';
import { UploadCertificateService } from './upload-certificate.service';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class NewDeviceService {

  private device: Device;
  private id: string = '';
  private error = 'Error de servicio';

  constructor(private http    : HttpClient,
              private upload  : UploadCertificateService) { }

  public getDevice() {
    return this.device;
  }

  public createDevice() {
    let body = this.prepare();

    return this.http.post(`${base_url}/device/create`, body)
      .pipe(
        map(resp => {
          console.log(resp);
          if (resp['ok']) {
            this.id = resp['id'];
            let calibrationId = resp['calibrationId'];
            console.log( { id: this.id, calibrationId });

            return this.upload.uploadFiles(
              this.id, calibrationId
              ,this.device.certificate, this.device.ryr)
              .subscribe(resp => {
                return resp;
              }, error => {
                return false;
              });
          } else {
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

  public setDetails(device: Device) {
    let old = this.device;
    this.device = device;
    this.device.calibraciones = old?.calibraciones;
    this.device.proveedores = old?.proveedores;
    this.device.responsables = old?.responsables;
    this.device.verificadores = old?.verificadores;
  }

  public setCalibraciones(calibraciones: Calibracion[]) {
    this.device.calibraciones = calibraciones;
  }

  public setResponsables(responsables: Responsable[]) {
    this.device.responsables = responsables;
  }

  public setVerificadores(verificadores: Verificacion[]) {
    this.device.verificadores = verificadores;
  }

  public setProveedores(proveedores: Proveedor[]) {
    this.device.proveedores = proveedores;
  }

  public hasFirstStep() {
    if (typeof this.device == 'undefined') {
      return false;
    }
    const descripcion = this.device?.descripcion || '';
    return descripcion != '';
  }

  public hasSecondStep() {
    if (typeof this.device == 'undefined') {
      return false;
    }
    return this.device.responsables?.length > 0;
  }

  public getError() {
    return this.error;
  }

  public getId() {
    return this.id;
  }

  /***
   * FIXED YEAR ADDITION
   */
  public loadDevice() {
    let ultima = new Date(this.device.ultima);
    let periodo: number = parseInt(this.device.periodo);

    let siguiente = this.addMonths(ultima, periodo);
    // siguiente.setFullYear(ultima.getFullYear() + periodo);
    this.device.siguiente = siguiente;

    let aviso = siguiente;
    aviso.setDate(aviso.getDate() - 20);
    this.device.aviso = aviso;

    this.device.id = 'Por asignar';

    return this.device;
  }

  private prepare() {
    let device: Device = Object.assign({}, this.device);

    device._responsables = [];
    device.responsables.forEach(r => {
      device._responsables.push({
        usuario: r.usuario
      });
    });

    device._proveedores = [];
    device.proveedores.forEach(p => {
      device._proveedores.push({
        nombre: p.nombre
      });
    });

    device._calibraciones = [];
    device.calibraciones.forEach(c => {
      device._calibraciones.push({
        calibrador: c.calibrador,
        fecha: c.fecha,
        verificador: c.verificador
      });
    });

    delete device.responsables;
    delete device.proveedores;
    delete device.calibraciones;

    console.log(device);

    const body = {
      type: device.tipo,
      device: device,
      proveedores: device._proveedores,
      responsables: device._responsables,
      verificadores: device.verificadores,
      calibraciones: device._calibraciones,
    }

    delete body.device.id;
    delete body.device.tipo;
    delete body.device._proveedores;
    delete body.device._responsables;
    delete body.device._calibraciones
    delete body.device.verificadores;
    delete body.device.ryr;
    delete body.device.certificate;

    return body;
  }

  public reset() {
    this.device = null;
  }

  private addMonths(date, months) {
    var d = date.getDate();
    date.setMonth(date.getMonth() + +months);
    if (date.getDate() != d) {
      date.setDate(0);
    }
    return date;
  }
}
