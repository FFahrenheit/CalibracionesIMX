import { Injectable } from '@angular/core';
import { DevicesService } from './devices.service';
import { GetDeviceService } from './get-device.service';

@Injectable({
  providedIn: 'root'
})
export class EditService {
  
  private id : string;

  constructor(private device  : GetDeviceService) { }

  public isValid(deviceId : string){
    this.id = deviceId;
    let device = this.device.getDevice();
    if(device == null || device.id != deviceId){
      return this.device.loadDevice(this.id);
    }
    return true;
  }
}
