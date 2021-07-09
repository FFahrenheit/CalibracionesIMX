import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DevicesService } from 'src/app/services/devices.service';
import { AlertService } from 'src/app/shared/alert';
import { IconsAlert } from 'src/app/util/icons.alert';

@Component({
  selector: 'app-admin-devices',
  templateUrl: './admin-devices.component.html',
  styleUrls: ['./admin-devices.component.scss']
})
export class AdminDevicesComponent implements OnInit {

  public devices = null;
  public icons = IconsAlert;

  constructor(private devicesService  : DevicesService,
              private router          : Router,
              private alert           : AlertService) { }

  ngOnInit(): void {
    this.loadDevices();
  }

  private loadDevices(req = this.devicesService.getSavedFilters()) : void{
    this.devicesService.loadDevices(req)
        .subscribe(resp=>{
          if(resp){
            this.devices = this.devicesService.getDevices();
          }else{
            this.alert.error(this.devicesService.getError());
          }
        },error=>{
          this.alert.error(this.devicesService.getError());
        });
  }

  public appyFilters($event){
    this.loadDevices($event);
  }

  public resetFilters(){
    this.loadDevices();
  }

  public deviceDetails(id : string){
    this.router.navigate(['editar',id,'empezar']);
  }

  public newDevice(){
    this.router.navigate(['nuevo','detalles']);
  }
}
