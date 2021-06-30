import { Injectable } from '@angular/core';
import { Calibracion, Device, Responsable } from '../interfaces/new-device.interface';

@Injectable({
  providedIn: 'root'
})
export class NewDeviceService {

  private device : Device;
  
  constructor() { }

  public setDetails( device : Device){
    this.device = device;
  }

  public setCalibraciones( calibraciones : Calibracion[]){
    this.device.calibraciones = calibraciones;
  }

  public getDevice(){
    return this.device;
  }

  public setResponsables(responsables : Responsable[]){
    this.device.responsables = responsables;
  }

  public setVerificadores(verificadores : string[]){
    this.device.verificadores = verificadores;
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
}
