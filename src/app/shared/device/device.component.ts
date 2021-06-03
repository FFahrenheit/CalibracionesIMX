import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NgbProgressbar } from '@ng-bootstrap/ng-bootstrap';
import { ErrorPipe } from 'src/app/pipes/error.pipe';
import { ResolutionPipe } from 'src/app/pipes/resolution.pipe';
import { GetDeviceService } from 'src/app/services/get-device.service';

@Component({
  selector: 'device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss'],
  providers: [ NgbProgressbar ]
})
export class DeviceComponent implements OnInit {

  @Input() id : string | null = '';
  @Input() title : string = 'Ver';

  public device = null;
  public exists : boolean | null = null;
  public error : string | null = '';

  public tests = Array(5).fill(0).map(Number.call, Number);
  public status = '';

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
        });
  }

  public getActive() : string{
    if(this.device == null){
      return ''
    };

    switch(this.device.activo){
      case 'Activo':
        return 'ok';
      case 'Reparacion':
        return 'waiting';
      case 'Baja':
      case 'Desactivado':
      case 'Extraviado':
        return 'not-ok';
      default:
        return 'unknown';
    }

  }

  public getStatus() : string{
    if(this.device == null){
      return ''
    };

    switch(this.device.estado){
      case 'Calibración Aceptada':
      case 'Referencia':
        return 'ok';
      case 'En Proceso de Calibración':
      case 'Reparacion':
        return 'waiting';
      case 'Calibración Pendiente':
        return 'warning';
      case 'Desactivado':
      case 'Baja':
        return 'not-ok';
      default:
        return 'unknown';
    }
  }

  public getDateType() : string{
    const today = new Date();
    const deadLine = new Date(this.device.calendario.ultimo);
    let daysDiff = Number(today) - Number(deadLine);
    daysDiff = Math.ceil(daysDiff / (1000 * 60 * 60 * 24));
    
    if(daysDiff > (365-20)){
      this.status = daysDiff < 365 ? 'Idealmente en proceso' : 'Idealmente calibrado';
      return 'danger';
    }

    if(daysDiff > (365-20-20)){
      this.status = 'Idealmente planeando calibración';
      return 'warning';
    }

    return 'dark';
  }

  public getDateValue() : number{
    const today = new Date();
    const deadLine = new Date(this.device.calendario.ultimo);
    let daysDiff = Number(today) - Number(deadLine);
    daysDiff = Math.ceil(daysDiff / (1000 * 60 * 60 * 24)); 
    return daysDiff / 365 * 100;
  }

}
