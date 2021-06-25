import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BorrowsService } from 'src/app/services/borrows.service';
import { AlertService } from 'src/app/shared/alert';

@Component({
  selector: 'app-return-device',
  templateUrl: './return-device.component.html',
  styleUrls: ['./return-device.component.scss']
})
export class ReturnDeviceComponent implements OnInit {

  public id : string | null = '';
  public show = false;
  public device = null;

  public form : FormGroup = Object.create(null);

  constructor(private route       : ActivatedRoute,
              private alert       : AlertService,
              private fb          : FormBuilder,
              private borrow      : BorrowsService,
              private router      : Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params=> {
      this.id = params.get('id');
    });

    this.form = this.fb.group({
      estado : ['', Validators.compose([Validators.required])],
      notas : ['']
    });

  }

  exists($event) {
    this.show = $event != null;
    this.device = $event;
  }


  markAsTouched(){
    this.form.markAllAsTouched();
  }

  get(control){
    return this.form.controls[control].value;
  }

  getValidity(){
    if(this.form.valid){
      if(this.get('estado') != 'Devuelto'){
        return this.get('notas') != ''; 
      }
      return true;
    }
    return false;
  }

  public confirm(){
    const id = this.device.prestamos[0].id;
    this.borrow.returnDevice(id, this.get('estado'), this.get('notas'))
        .subscribe(resp=>{
          if(resp){
            this.alert.success('Equipo correctamente regresado');
            setTimeout(() => {
              this.router.navigate(['prestamos','detalles',this.id]);
            }, 2500);
          }
          else{
            this.alert.error(this.borrow.getError());
          }
        },error=>{
          this.alert.error(this.borrow.getError());
        });    
  }

  public getClass(ctrl : string){
    const control = this.form.controls[ctrl];
    if(!control.touched){
      return ''
    }
    if(ctrl == 'notas' && this.form.controls['estado'].value == 'Devuelto'){      
      return 'is-valid';
    }
    return control.value == '' ? 'is-invalid' : 'is-valid';
  }

}
