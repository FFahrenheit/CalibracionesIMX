import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'device-options',
  templateUrl: './device-options.component.html',
  styleUrls: ['./device-options.component.scss']
})
export class DeviceOptionsComponent implements OnInit {

  @Input() public device : any = null;

  public actions = [];
  public id : string;
  public loaded = false;

  public currentRoute : string[];

  constructor(private router: Router,
              private auth  : LoginService) { }

  ngOnInit(): void {
    this.currentRoute = this.router.url.substring(1).split('/');
    console.log(this.currentRoute);
  }

  ngOnChanges(changes : SimpleChanges) : void{
    if(changes.device.previousValue == undefined && changes.device.currentValue != null){
      this.loaded = true;
      this.id = this.device.id;
      this.actions = [];

      this.actions.push({
        action: 'Ver equipo',
        link: ['equipos','detalles',this.id],
        icon: 'far fa-eye'
      });

      this.actions.push({
        action: 'Historial de préstamos',
        link: ['prestamos','detalles',this.id],
        icon: 'fas fa-history'
      });
    }

    this.loadActions();

  }

  public loadActions() : void{
    if(this.auth.isAdmin()){

      this.actions.push({
        action: 'Empezar proceso de calibración',
        link: ['calibraciones','empezar',this.id],
        icon: 'fas fa-flag'
      });

      this.actions.push({
        action: 'Actualizar estado calibración',
        link: ['calibraciones','actualizar',this.id],
        icon: 'fas fa-cogs'
      });

      this.actions.push({
        action: 'Confirmar calibración',
        link: ['calibraciones','confirmar',this.id],
        icon: 'fas fa-check'
      });

      
      this.actions.push({
        action: 'Adjuntar archivos',
        link: ['calibraciones','adjuntar',this.id],
        icon: 'fas fa-file-upload'
      });

      this.actions.push({
        action: 'Editar equipo',
        link: ['editar',this.id, 'empezar'],
        icon: 'fas fa-pencil-alt'
      });
      
      this.actions.push({
        action: 'Actualizar estado equipo',
        link: ['editar',this.id, 'estado'],
        icon: 'fas fa-wrench'
      });

    }
    if(this.auth.isLender() || this.auth.isAdmin()){
      if(this.device.prestatario == null){
        this.actions.push({
          action: 'Prestar equipo',
          link: ['prestamos','empezar',this.id],
          icon: 'fas fa-hand-holding'
        });
      }else{
        this.actions.push({
          action: 'Regresar equipo',
          link: ['prestamos','regresar',this.id],
          icon: 'fas fa-hand-holding'
        });
      }
    }
  }

  public goTo(link : string[]){
    this.router.navigate(link);
  }

}
