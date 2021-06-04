import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DevicesService } from 'src/app/services/devices.service';
import { AlertService } from 'src/app/shared/alert';
import { IconsAlert } from 'src/app/util/icons.alert';

@Component({
  selector: 'app-devices-list',
  templateUrl: './devices-list.component.html',
  styleUrls: ['./devices-list.component.scss']
})
export class DevicesListComponent implements OnInit {

  public devices;
  public icons = IconsAlert;

  constructor(private devicesService  : DevicesService,
              private router          : Router,
              private alert           : AlertService) { }

  ngOnInit(): void {
    this.devicesService.loadDevices()
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

  public deviceDetails(id : string){
    this.router.navigate(['equipos','detalles',id]);
  }

}
