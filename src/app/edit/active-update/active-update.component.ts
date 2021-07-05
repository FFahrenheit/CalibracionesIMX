import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { activos } from 'src/app/resources/device.component.statuses';
import { UpdateDeviceService } from 'src/app/services/update-device.service';
import { AlertService } from 'src/app/shared/alert';

@Component({
  selector: 'app-active-update',
  templateUrl: './active-update.component.html',
  styleUrls: ['./active-update.component.scss']
})
export class ActiveUpdateComponent implements OnInit {

  public id : string | null = '';
  public show = false;
  public activos = activos;

  constructor(private route   : ActivatedRoute,
              private status  : UpdateDeviceService,
              private alert   : AlertService,
              private router  : Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params=> {
      this.id = params.get('id');
    });
  }

  exists($event){
    this.show = $event != null;
  }

  changeStatus($event  : string){
    if($event == 'Calibración Vigente'){
      this.router.navigate(['calibraciones','confirmar',this.id]);
      return;
    }

    this.status.updateActive(this.id,$event).subscribe(
      resp=>{
        if(resp){
          this.alert.success('Se ha cambiado el estado');
          setTimeout(() => {
            this.router.navigate(['equipos','detalles',this.id]);
          }, 2500);
        }else{
          this.alert.error(this.status.geError());
        }
      },error=>{
        this.alert.error(this.status.geError());
      }
    );
  }

}
