import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbProgressbar } from '@ng-bootstrap/ng-bootstrap';
import { ErrorPipe } from 'src/app/pipes/error.pipe';
import { ResolutionPipe } from 'src/app/pipes/resolution.pipe';
import { GetDeviceService } from 'src/app/services/get-device.service';
import { IconsAlert } from 'src/app/util/icons.alert';

@Component({
  selector: 'device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss'],
  providers: [ NgbProgressbar ]
})
export class DeviceComponent implements OnInit {

  @Input() public id : string | null = '';
  @Input() public title : string = 'Ver';

  public device = null;
  public exists : boolean | null = null;
  public error : string | null = '';

  public status = '';

  @Output() public receive = new EventEmitter<any>();

  constructor(private deviceService : GetDeviceService,
              public errorPipe      : ErrorPipe,
              public resolution     : ResolutionPipe,
              public datePipe       : DatePipe,
              public progressBar    : NgbProgressbar) { 
  }

  ngOnInit(): void {
    this.deviceService.loadDevice(this.id!)
        .subscribe( resp=>{
          this.exists = resp;
          if(this.exists){
            this.device = this.deviceService.getDevice();
          }else{
            this.error = this.deviceService.getError();            
          }
          this.receive.emit(this.device || null);
        },error=>{
          this.exists = false;
          this.receive.emit(this.exists);
        });
    this.receive.emit(this.device);
  }

  public getActive() : string{
    if(this.device == null){
      return ''
    };

    return IconsAlert.getActive(this.device.activo);
  }

  public getStatus() : string{
    if(this.device == null){
      return ''
    };

    return IconsAlert.getStatus(this.device.estado);
  }

  public getDateType() : string{
    const today = new Date();
    const deadLine = new Date(this.device.ultima);
    let daysDiff = Number(today) - Number(deadLine);
    daysDiff = Math.ceil(daysDiff / (1000 * 60 * 60 * 24));
    
    const periodo = this.device.periodo*365;

    const daysLeft = periodo - daysDiff;

    console.log(daysLeft);

    if(daysLeft <= 0){
      this.status = 'Idealmente calibrado';
      return 'danger';
    }

    if(daysLeft <= 10){
      this.status = 'Idealmente en proceso'
      return 'warning';
    }

    if(daysLeft <= 20){
      this.status = 'Idealmente planeando calibración'
      return 'warning';
    }

    this.status = 'Calibración vigente';
    return 'success';
  }

  public getDateValue() : number{
    const today = new Date();
    const deadLine = new Date(this.device.ultima);
    let daysDiff = Number(today) - Number(deadLine);
    daysDiff = Math.ceil(daysDiff / (1000 * 60 * 60 * 24)); 
    return daysDiff / (Number(this.device.periodo)*365) * 100;
  }

  public getDays() : string {
    const today = new Date();
    const deadLine = new Date(this.device.siguiente);
    let daysDiff = Number(deadLine) - Number(today);
    daysDiff = Math.ceil(daysDiff / (1000 * 60 * 60 * 24))
    
    return daysDiff + ' días';
  }

  public daysIcon() : string{
    const today = new Date();
    const deadLine = new Date(this.device.siguiente);
    let daysDiff = Number(deadLine) - Number(today);
    daysDiff = Math.ceil(daysDiff / (1000 * 60 * 60 * 24));

    if(daysDiff<=0){
      return 'not-ok';
    }

    if(daysDiff<=20){
      return 'warning';
    }

    return 'ok';
  }

}
