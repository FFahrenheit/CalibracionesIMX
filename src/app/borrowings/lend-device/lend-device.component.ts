import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import { BorrowsService } from 'src/app/services/borrows.service';
import { UsersService } from 'src/app/services/users.service';
import { AlertService } from 'src/app/shared/alert';
import { UserInputComponent } from 'src/app/shared/user-input/user-input.component';

@Component({
  selector: 'app-lend-device',
  templateUrl: './lend-device.component.html',
  styleUrls: ['./lend-device.component.scss']
})
export class LendDeviceComponent implements OnInit {

  public id : string | null = '';
  public show = false;
  public device = null;
  public validInput = false;

  @ViewChild('prestatario') prestatario : UserInputComponent;

  public form : FormGroup = Object.create(null);
  public users;

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

    this.userService.getUsers()
        .subscribe((resp:any)=>{
          console.log(resp);
          if(resp['ok']){
            this.users = resp.usuarios;
            console.log(this.users);
          }
        },(error)=>{
          console.log('Error retrieving users');
          console.log(error);
        })
  }

  public setValues(data){
    if(data != null && data.username != null){
      console.log('Valid!');
      this.validInput = true;
      this.form.controls['prestatario'].setValue(data.name);
      this.form.controls['username'].setValue(data.username);
      this.form.updateValueAndValidity({ onlySelf: true, emitEvent: true });

    }else{
      console.log('Invalid');
      this.validInput = false;
      this.form.controls['prestatario'].setValue('');
      this.form.controls['username'].setValue('');    
      this.form.updateValueAndValidity({ onlySelf: true, emitEvent: true });
    }
  }

  exists($event) {
    this.show = $event != null;
    this.device = $event;
  }

  goDown() {
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight);
    }, 1);
  }

  markAsTouched(){
    this.form.markAllAsTouched();
    this.prestatario.markAsTouched();
  }

  getValidity(){
    if(this.device.prestatario != null){
      return false;
    }
    if (this.prestatario != null){
      return this.prestatario.getValidity();
    }
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
