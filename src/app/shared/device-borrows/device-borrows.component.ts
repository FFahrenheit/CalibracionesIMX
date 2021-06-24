import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgbProgressbar } from '@ng-bootstrap/ng-bootstrap';
import { ErrorPipe } from 'src/app/pipes/error.pipe';
import { ResolutionPipe } from 'src/app/pipes/resolution.pipe';
import { GetBorrowService } from 'src/app/services/get-borrow.service';
import { GetDeviceService } from 'src/app/services/get-device.service';
import { IconsAlert } from 'src/app/util/icons.alert';

@Component({
  selector: 'device-borrows',
  templateUrl: './device-borrows.component.html',
  styleUrls: ['./device-borrows.component.scss']
})
export class DeviceBorrowsComponent implements OnInit {

  @Input() public id : string | null = '';

  public device = null;
  public exists : boolean | null = null;
  public error : string | null = '';

  @Output() public receive = new EventEmitter<any>();

  constructor(private deviceService : GetBorrowService,
              public errorPipe      : ErrorPipe,
              public resolution     : ResolutionPipe,
              public datePipe       : DatePipe,
              private router        : Router) { 
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

}
