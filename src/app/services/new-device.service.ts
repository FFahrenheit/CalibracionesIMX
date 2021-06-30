import { Injectable } from '@angular/core';
import { Calibracion, Device } from '../interfaces/new-device.interface';

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
}
