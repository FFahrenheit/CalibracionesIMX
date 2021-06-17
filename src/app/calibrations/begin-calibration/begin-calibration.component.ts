import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-begin-calibration',
  templateUrl: './begin-calibration.component.html',
  styleUrls: ['./begin-calibration.component.scss']
})
export class BeginCalibrationComponent implements OnInit {

  public id : string | null = '';
  public show = false;
  public options = ['Calibración Pendiente','En Proceso de Calibración'];

  constructor(private route:  ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params=> {
      this.id = params.get('id');
    });
  }

  exists($event){
    this.show = $event != null;
  }

  public getHtmlContent(){
    return `Seleccione el estado que más describe la situación con la calibración.
    Si desea dar de baja el dispositivo o marcarlo como calibrado diríjase a 
    <a style="color:rgb(0, 2, 141);" href="/calibraciones/actualizar/${ this.id }"> Actualizar equipos </a>`;
  }

}
