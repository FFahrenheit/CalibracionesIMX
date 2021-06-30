import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EditService } from 'src/app/services/edit.service';
import { AlertService } from 'src/app/shared/alert';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {

  public device;
  public id;

  constructor(private edit    : EditService,
              private router  : Router,
              private alert   : AlertService) { }

  ngOnInit(): void {
    if((this.device = this.edit.get()) == null){
      this.device = this.edit.getDevice();
    }  
    this.id = this.device.id;
  }
  
  confirm(){
    this.edit.editDevice()
        .subscribe(resp=>{
          if(resp){
            this.alert.success('Dispositivo modificado');
            setTimeout(() => {
              this.router.navigate(['equipos','detalles',this.edit.get().id]);
            }, 2500);
          }else{
            this.alert.error(this.edit.getError());
          }
        },error=>{
          this.alert.error(this.edit.getError());
        });
  }

}
