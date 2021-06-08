import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DevicesService } from 'src/app/services/devices.service';
import { AlertService } from 'src/app/shared/alert';
import { IconsAlert } from 'src/app/util/icons.alert';

@Component({
  selector: 'app-process-devices',
  templateUrl: './process-devices.component.html',
  styleUrls: ['./process-devices.component.scss']
})
export class ProcessDevicesComponent implements OnInit {

  public devices = null;
  public icons = IconsAlert;

  constructor(private devicesService  : DevicesService,
              private router          : Router,
              private alert           : AlertService) { }

  ngOnInit(): void {
    this.loadDevices();
  }

  public deviceDetails(id : string){
    this.router.navigate(['equipos','detalles',id]);
  }

  private loadDevices(req = null) : void{
    this.devicesService.loadDevices(req,'process')
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

}
