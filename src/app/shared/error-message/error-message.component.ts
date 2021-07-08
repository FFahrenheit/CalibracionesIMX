import { Location } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss']
})
export class ErrorMessageComponent implements OnInit {

  @Input() public title = 'Error';
  @Input() public description = "No pudimos encontrar el recurso solicitado";
  @Input() public type = 'error';
  @Input() public styles = '';
  @Input() public loading = true;
  @Input() public action = 'Regresar';
  @Input() public customAction = false;

  @Output() public back = new EventEmitter<any>(); 

  constructor(public location : Location) { }
  
  public url; 
  public error_url = './../../../assets/img/error.jpg';
  public empty_url = './../../../assets/img/empty.png';
  public empty_sub_url = './../../../assets/img/lazy.png';

  ngOnInit(): void {
    switch(this.type){
      case 'error':
        this.url = this.error_url;
        break;
      case 'empty':
        this.url = this.empty_url;
        break;
      case 'empty-sub':
        this.url = this.empty_sub_url;
        break;
      case 'easter':
        this.url =  './../../../assets/img/easter.png';
        break;
    }
  }

  public goBack(){
    if(this.customAction){
      this.back.emit();
    }
    else{
      this.location.back();
    }
  }

}
