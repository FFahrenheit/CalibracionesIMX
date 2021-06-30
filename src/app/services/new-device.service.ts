import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Calibracion, Device, Proveedor, Responsable, Verificacion } from '../interfaces/new-device.interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class NewDeviceService {

  private device: Device;
  private id: string = '';
  private error = 'Error de servicio';

  constructor(private http: HttpClient) { }

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
            return true;
          }
          this.error = 'Error al crear';
          return false;
        }), catchError(error => {
          console.log(error);
          this.error = 'Error en servidor';
          return of(false);
        })
      )
  }

  public setDetails(device: Device) {
    this.device = device;
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

  public getError(){
    return this.error;
  }

  public getId(){
    return this.id;
  }

  public loadDevice() {
    let ultima = new Date(this.device.ultima);
    let periodo: number = parseInt(this.device.periodo);

    let siguiente = ultima;
    siguiente.setFullYear(ultima.getFullYear() + periodo);
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

    delete device.responsables;
    delete device.proveedores;

    console.log(device);

    const body = {
      device : device,
      proveedores : device._proveedores,
      responsables : device._responsables,
      verificadores : device.verificadores,
      calibraciones : device.calibraciones
    }

    delete body.device.id;
    delete body.device._proveedores;
    delete body.device._responsables;
    delete body.device.verificadores;
    delete body.device.calibraciones;

    return body;
  }
}
