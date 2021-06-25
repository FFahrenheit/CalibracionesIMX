import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BorrowsService } from 'src/app/services/borrows.service';
import { UsersService } from 'src/app/services/users.service';
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
              private userService : UsersService,
              private borrow      : BorrowsService,
              private router      : Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params=> {
      this.id = params.get('id');
    });

    this.form = this.fb.group({
      prestatario : ['', Validators.compose([Validators.required])],
      username : ['']
    });

  }

  exists($event) {
    this.show = $event != null;
    this.device = $event;
  }


  markAsTouched(){
    this.form.markAllAsTouched();
  }

  getValidity(){
    return false;
  }

  public confirm(){
    this.borrow.borrowDevice(this.id, this.form.controls['username'].value)
        .subscribe(resp=>{
          if(resp){
            this.alert.success('Equipo correctamente prestado');
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

}
