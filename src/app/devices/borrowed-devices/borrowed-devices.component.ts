import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DevicesService } from 'src/app/services/devices.service';
import { AlertService } from 'src/app/shared/alert';
import { IconsAlert } from 'src/app/util/icons.alert';

@Component({
  selector: 'app-borrowed-devices',
  templateUrl: './borrowed-devices.component.html',
  styleUrls: ['./borrowed-devices.component.scss']
})
export class BorrowedDevicesComponent implements OnInit {

  public devices = null;
  public icons = IconsAlert;
  public filterCount = 0;

  constructor(private devicesService  : DevicesService,
              private router          : Router,
              private alert           : AlertService) { }

  ngOnInit(): void {
    this.loadDevices();
  }

  public deviceDetails(id : string){
    this.router.navigate(['prestamos','regresar',id]);
  }

  private loadDevices(req = this.devicesService.getSavedFilters()) : void{
    this.devicesService.loadDevices(req,'borrowed')
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
    this.filterCount = Object.keys($event).length;
  }

  public resetFilters(){
    this.filterCount = 0;
    this.loadDevices();
  }


}
