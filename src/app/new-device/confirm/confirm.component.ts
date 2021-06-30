import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Device } from 'src/app/interfaces/new-device.interface';
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
              private alert   : AlertService) { }

  ngOnInit(): void {
    this.device = this.create.loadDevice();
  }
  
  confirm(){
    console.log('CONFIRMADO');
  }

}
