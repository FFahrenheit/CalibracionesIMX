import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UpdateDeviceService } from 'src/app/services/update-device.service';
import { AlertService } from 'src/app/shared/alert';

@Component({
  selector: 'app-update-status',
  templateUrl: './update-status.component.html',
  styleUrls: ['./update-status.component.scss']
})
export class UpdateStatusComponent implements OnInit {

  public id : string | null = '';
  public show = false;

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
    this.status.updateStatus(this.id,$event).subscribe(
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
    )
  }
}
