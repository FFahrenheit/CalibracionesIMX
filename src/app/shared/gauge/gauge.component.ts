import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { GaugesService } from 'src/app/services/gauges.service';
import { AlertService } from '../alert';

@Component({
  selector: 'gauge',
  templateUrl: './gauge.component.html',
  styleUrls: ['./gauge.component.scss']
})
export class GaugeComponent implements OnInit, OnChanges {

  @Input() public id : string = '';
  
  @Output() public loaded = new EventEmitter<number>();  
  public Status = {
    WAITING: 0,
    SHOW: 1,
    NOT_FOUND: 2,
    ERROR: 3,
    LOADING: 4
  }; 
  public status : number = this.Status.WAITING;
  public gauge : any;

  constructor(private gaugesService : GaugesService,
              private alert         : AlertService) { }

  ngOnInit(): void {
    Object.freeze(this.Status);
  }

  ngOnChanges(){
    if(this.id != ''){
      this.status = this.Status.LOADING;
      this.gaugesService.loadGaugeDetails(this.id)
          .subscribe(resp=>{
            if(resp){
              this.gauge = this.gaugesService.getGuage(); 
              this.status = this.Status.SHOW;
            }else{
              this.alert.error(this.gaugesService.getError());
              this.status = this.Status.NOT_FOUND;
            }
            this.loaded.emit(this.status);
          },error=>{
            this.alert.error(this.gaugesService.getError());
            this.status = this.Status.ERROR;
            this.loaded.emit(this.status);
          });
    }
  }

  public reload() : void{
    window.location.reload();
  }

}
