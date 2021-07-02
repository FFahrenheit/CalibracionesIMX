import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UpdateDeviceService } from 'src/app/services/update-device.service';
import { AlertService } from 'src/app/shared/alert';

@Component({
  selector: 'app-begin-calibration',
  templateUrl: './begin-calibration.component.html',
  styleUrls: ['./begin-calibration.component.scss']
})
export class BeginCalibrationComponent implements OnInit {

  public id : string | null = '';
  public show = false;
  public options = ['Calibración Vencida','En Proceso de Calibración', 'Calibración Vigente'];

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

  public getHtmlContent(){
    return `Seleccione el estado que más describe la situación con la calibración.<br>
    Si desea dar de baja el dispositivo o marcarlo como calibrado diríjase a 
    <a style="color:rgb(0, 2, 141);" href="/calibraciones/actualizar/${ this.id }"> Actualizar equipos </a>`;
  }

  public changeStatus($event : string){
    if($event == 'Calibración Vigente'){
      window.scroll(0,0);
      this.alert.warn('Llene el formulario de Calibración Vigente primero');
      setTimeout(() => {
        this.router.navigate(['calibraciones','confirmar',this.id]);
      }, 2350);
      return;
    }
    this.status.updateStatus(this.id,$event).subscribe(
      resp=>{
        if(resp){
          this.alert.success('Se ha actualizado el estado de calibración');
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
