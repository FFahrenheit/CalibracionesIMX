import { Injectable } from '@angular/core';
import { GetDeviceService } from './get-device.service';

@Injectable({
  providedIn: 'root'
})
export class EditService {
  
  private id : string;
  private device = null;

  constructor(private deviceService  : GetDeviceService) { }

  public isValid(deviceId : string){
    this.id = deviceId;
    let device = this.deviceService.getDevice();
    if(device == null || device.id != deviceId){
      return this.deviceService.loadDevice(this.id);
    }
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
}
