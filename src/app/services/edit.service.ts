import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { DevicesService } from './devices.service';
import { GetDeviceService } from './get-device.service';

@Injectable({
  providedIn: 'root'
})
export class EditService {
  
  private id : string;
  private device;

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
}
