import { Injectable } from '@angular/core';
import { Calibracion, Device, Proveedor, Responsable, Verificacion } from '../interfaces/new-device.interface';

@Injectable({
  providedIn: 'root'
})
export class NewDeviceService {

  private device : Device;
  
  constructor() { }

  public getDevice(){
    return this.device;
  }

  public setDetails( device : Device){
    this.device = device;
  }

  public setCalibraciones( calibraciones : Calibracion[]){
    this.device.calibraciones = calibraciones;
  }

  public setResponsables(responsables : Responsable[]){
    this.device.responsables = responsables;
  }

  public setVerificadores(verificadores : Verificacion[]){
    this.device.verificadores = verificadores;
  }

  public setProveedores(proveedores : Proveedor[]){
    this.device.proveedores = proveedores;
  }

  public hasFirstStep(){
    if(typeof this.device == 'undefined'){
      return false;
    }
    const descripcion = this.device?.descripcion || '';
    return descripcion != '';
  }

  public hasSecondStep(){
    if(typeof this.device == 'undefined'){
      return false;
    }
    return this.device.responsables?.length > 0;
  }

  public loadDevice(){
    let ultima = new Date(this.device.ultima);
    let periodo : number = parseInt(this.device.periodo);

    let siguiente = ultima;
    siguiente.setFullYear(ultima.getFullYear() + periodo);
    this.device.siguiente = siguiente;

    let aviso = siguiente;
    aviso.setDate(aviso.getDate() - 20);
    this.device.aviso = aviso;

    this.device.id = 'Por asignar';

    return this.device;
  }
}
