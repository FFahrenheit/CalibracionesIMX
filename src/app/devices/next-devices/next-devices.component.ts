import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DevicesService } from 'src/app/services/devices.service';
import { AlertService } from 'src/app/shared/alert';
import { IconsAlert } from 'src/app/util/icons.alert';

@Component({
  selector: 'app-next-devices',
  templateUrl: './next-devices.component.html',
  styleUrls: ['./next-devices.component.scss']
})
export class NextDevicesComponent implements OnInit {

  public devices = null;
  public icons = IconsAlert;

  constructor(private devicesService  : DevicesService,
              private router          : Router,
              private alert           : AlertService) { }

  ngOnInit(): void {
    this.loadDevices();
  }

  public deviceDetails(id : string){
    this.router.navigate(['calibraciones','empezar',id]);
  }

  private loadDevices(req = null) : void{
    this.devicesService.loadDevices(req,'next')
        .subscribe(resp=>{
          if(resp){
            this.devices = this.devicesService.getDevices();
            this.devices.forEach(d => {
              const today = new Date();
              const deadLine = new Date(d.siguiente);
              let daysDiff = Number(deadLine) - Number(today);
              daysDiff = Math.ceil(daysDiff / (1000 * 60 * 60 * 24));
              d['dias'] = daysDiff;
            });
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
