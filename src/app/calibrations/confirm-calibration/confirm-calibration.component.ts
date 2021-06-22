import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UpdateDeviceService } from 'src/app/services/update-device.service';
import { AlertService } from 'src/app/shared/alert';

@Component({
  selector: 'app-confirm-calibration',
  templateUrl: './confirm-calibration.component.html',
  styleUrls: ['./confirm-calibration.component.scss']
})
export class ConfirmCalibrationComponent implements OnInit {

  public id : string | null = '';
  public show = false;
  public device = null;
  public form : FormGroup = Object.create(null);
  public reasons : string[];

  constructor(private route   : ActivatedRoute,
              private status  : UpdateDeviceService,
              private alert   : AlertService,
              private router  : Router,
              private fb      : FormBuilder) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params=> {
      this.id = params.get('id');
    });

    this.form =  this.fb.group({
      calibrador: [''],
      hasRyr: [false],
      hasCertificate: [false],
      ryr: [''],
      certificate: [''],
    });
  }

  exists($event){
    this.show = $event != null;
    this.device = $event;
  }

  confirmCalibration(){

    let calibrador;
    if(this.device.calibracion == 'INTERNO'){
      calibrador = 'Interplex';
    }else if(this.form.controls['calibrador'].value != ''){
      calibrador = this.form.controls['calibrador'].value;
    }else{
      calibrador = 'N/I';
    }

    this.status.acceptCalibration(this.id,calibrador).subscribe(
      resp=>{
        if(resp){
          this.alert.success('Calibración aceptada');
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

  needsEvidence(){
    this.reasons = [];
    let status = false;
    if(!this.form.controls['hasRyr'].value && !this.form.controls['hasCertificate'].value){
      return false;
    }
    if(this.form.controls['hasCertificate'].value && this.form.controls['certificate'].value == ''){
      this.reasons.push('No se ha adjuntado el certificado de calibración');
      status = true;
    }
    // console.log([this.form.controls['hasCertificate'].value, this.form.controls['certificate'].value == ''])
    if(this.form.controls['hasRyr'].value && this.form.controls['ryr'].value == ''){
      this.reasons.push('No se ha adjuntado el archivo RYR');
      status = true;
    }
    return status;
  }

  goDown(){
    setTimeout(() => {
      window.scrollTo(0,document.body.scrollHeight);
    }, 1);
  }
}
