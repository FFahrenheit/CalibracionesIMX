import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GetDeviceService } from 'src/app/services/get-device.service';
import { ProvidersService } from 'src/app/services/providers.service';
import { AlertService } from 'src/app/shared/alert';

@Component({
  selector: 'app-see-providers',
  templateUrl: './see-providers.component.html',
  styleUrls: ['./see-providers.component.scss']
})
export class SeeProvidersComponent implements OnInit {

  public proveedores = [];

  constructor(private alert     : AlertService,
              private getDevice : GetDeviceService,
              private router    : Router,
              private providers : ProvidersService) { }

  ngOnInit(): void {
    this.providers.loadProviders()
    .subscribe(resp=>{
      if(resp){
        let proveedores = this.providers.getProviders().map( p => ({...p, new: false}));
        console.table(proveedores);
        this.proveedores = proveedores;
      }else{
        this.alert.error(this.providers.getError());
      }
    },error=>{
      this.alert.error(this.providers.getError());
    });
  }

  public seeCertificate(provider){
    return this.getDevice.downloadFile(provider.certificado);
  }

  goToAdmin(){
    this.router.navigate(['usuarios','proveedores','administrar']);
  }

  public isFile(val){
    return typeof val != 'string';
  }

}
