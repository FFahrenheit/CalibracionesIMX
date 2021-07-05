import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  public daysBorrowed : number;
  public daysBefore : number;
  public today : string | Date = new Date();

  @ViewChild('prestatario') prestatario : UserInputComponent;

  public form : FormGroup = Object.create(null);
  public users;

  constructor(private route       : ActivatedRoute,
              private alert       : AlertService,
              private fb          : FormBuilder,
              private userService : UsersService,
              private borrow      : BorrowsService,
              private router      : Router,
              public date         : DatePipe) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params=> {
      this.id = params.get('id');
    });

    this.today = this.date.transform(this.today, 'yyyy-MM-dd');

    this.form = this.fb.group({
      prestatario : ['', Validators.compose([Validators.required])],
      username : [''],
      fechaCompromiso : ['', Validators.required]
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
        });
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

  markAsTouched(){
    this.form.markAllAsTouched();
    this.prestatario.markAsTouched();
  }

  getValidity(){
    if(this.device.prestatario != null){
      return false;
    }
    if (this.prestatario != null){
      return this.prestatario.getValidity() && this.form.valid;
    }
    return false;
  }

  public confirm(){
    this.borrow.borrowDevice(this.id, this.form.controls['username'].value, 
    this.form.controls['fechaCompromiso'].value)
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

  private updateDate(){
    console.log(this.today);
    let today = new Date(this.today);
    let compromiso = new Date(this.form.controls['fechaCompromiso'].value);
    let calibracion = new Date(this.device.siguiente);

    console.log([today, compromiso, calibracion]);
    
    let daysDiff = Number(compromiso) - Number(today);
    this.daysBorrowed = Math.ceil(daysDiff / (1000 * 60 * 60 * 24)) + 1;

    daysDiff = Number(calibracion) - Number(compromiso);
    this.daysBefore = Math.ceil(daysDiff / (1000 * 60 * 60 * 24)) - 1;
    
  }

  public getClass(ctrl : string) : string{
    if(ctrl == 'fechaCompromiso'){
      this.updateDate();
    }
    if(!this.form.controls[ctrl].touched){
      return '';
    }
    return this.form.controls[ctrl].valid ? 'is-valid' : 'is-invalid';
  }

  public getReasons() : any {
    let reasons = [];
    if(this.device.prestatario != null){
      return 'El equipo no está disponible para préstamo';
    }
    if(this.prestatario != null && !this.prestatario.getValidity()){
      reasons.push('Falta ingresar el prestatario');
    }
    if(!this.form.controls['fechaCompromiso'].valid){
      reasons.push('Ingrese una fecha de compromiso de retorno');
    }
    return reasons;
  }

}
