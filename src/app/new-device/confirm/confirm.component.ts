import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Device } from 'src/app/interfaces/new-device.interface';
import { NavigationService } from 'src/app/services/navigation.service';
import { NewDeviceService } from 'src/app/services/new-device.service';
import { AlertService } from 'src/app/shared/alert';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {

  public device : Device;

  constructor(private create  : NewDeviceService,
              private router  : Router,
              private alert   : AlertService,
              private nav     : NavigationService) { }

  ngOnInit(): void {
    this.nav.reactivate();
    this.device = this.create.loadDevice();
  }
  
  confirm(){
    this.create.createDevice()
        .subscribe(resp=>{
          if(resp){
            this.alert.success('Dispositivo dado de alta');
            this.nav.deactivate();
            setTimeout(() => {
              this.create.reset();
              this.router.navigate(['equipos','detalles',this.create.getId()]);
            }, 2500);
          }else{
            this.alert.error(this.create.getError());
          }
        },error=>{
          this.alert.error(this.create.getError());
        });
  }

}
