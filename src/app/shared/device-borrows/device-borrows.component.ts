import { DatePipe, TitleCasePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorPipe } from 'src/app/pipes/error.pipe';
import { ResolutionPipe } from 'src/app/pipes/resolution.pipe';
import { GetBorrowService } from 'src/app/services/get-borrow.service';
import { IconsAlert } from 'src/app/util/icons.alert';

@Component({
  selector: 'device-borrows',
  templateUrl: './device-borrows.component.html',
  styleUrls: ['./device-borrows.component.scss']
})
export class DeviceBorrowsComponent implements OnInit {

  @Input() public id : string | null = '';
  @Input() public canHide = false;

  public device = null;
  public exists : boolean | null = null;
  public error : string | null = '';
  public show = true;
  public status = '';

  @Output() public receive = new EventEmitter<any>();

  constructor(private deviceService : GetBorrowService,
              public errorPipe      : ErrorPipe,
              public resolution     : ResolutionPipe,
              public datePipe       : DatePipe,
              private router        : Router,
              public titleCase     : TitleCasePipe) { 
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

  public getDetails(){
    this.router.navigate(['equipos','detalles',this.id]);
  }

  public getIcon(estado){
    return IconsAlert.prestamo(estado);
  }

  /***
   * FIX FIX FIX
   */
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

  /**
   * FIX FIX FIX
   */
  public getDateValue() : number{
    const today = new Date();
    const deadLine = new Date(this.device.ultima);
    let daysDiff = Number(today) - Number(deadLine);
    daysDiff = Math.ceil(daysDiff / (1000 * 60 * 60 * 24)); 
    return daysDiff / (Number(this.device.periodo)*365/12) * 100;
  }

}
