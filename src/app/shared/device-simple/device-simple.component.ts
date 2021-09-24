import { TitleCasePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorPipe } from 'src/app/pipes/error.pipe';
import { ResolutionPipe } from 'src/app/pipes/resolution.pipe';
import { IconsAlert } from 'src/app/util/icons.alert';

@Component({
  selector: 'device-simple',
  templateUrl: './device-simple.component.html',
  styleUrls: ['./device-simple.component.scss']
})
export class DeviceSimpleComponent implements OnInit {

  @Input() device : any = null;

  public status : string;

  constructor(private router    : Router,
              public titleCase  : TitleCasePipe,
              public resolution : ResolutionPipe,
              public errorPipe  : ErrorPipe) { }

  ngOnInit(): void {
  }

  getObject(){
    return JSON.stringify(this.device)
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

  public getDetails(){
    this.router.navigate(['equipos','detalles',this.device['id']]);
  }

  public getIcon(estado){
    return IconsAlert.prestamo(estado);
  }

  public getDateType() : string{
    const today = new Date();
    const deadLine = new Date(this.device.ultima);
    let daysDiff = Number(today) - Number(deadLine);
    daysDiff = Math.ceil(daysDiff / (1000 * 60 * 60 * 24));
    
    const periodo = Math.round(this.device.periodo*365/12);

    const daysLeft = periodo - daysDiff;

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

    this.status = this.getDateValue() > 50 ?  'Calibración vigente' : '';
    return 'success';
  }

  public getDateValue() : number{
    const today = new Date();
    const deadLine = new Date(this.device.ultima);
    let daysDiff = Number(today) - Number(deadLine);
    daysDiff = Math.ceil(daysDiff / (1000 * 60 * 60 * 24)); 
    return daysDiff / (Number(this.device.periodo)*365/12) * 100;
  }

}
