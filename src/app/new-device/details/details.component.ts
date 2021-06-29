import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/shared/alert';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  public form : FormGroup;

  constructor(private fb    : FormBuilder,
              private alert : AlertService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      descripcion : ['', Validators.required],
      serie : ['', Validators.required],
      ubicacion : ['', Validators.required],
      calibracion : ['INTERNO', Validators.required],
      error : [''],
      resInf : [''],
      resSup : [''],
      periodo : ['', Validators.compose([Validators.required, Validators.min(1)])],
      fechaCalibracion : ['',Validators.required],
      calibradorCalibracion : ['', Validators.required]
    });
  }

  get(ctrl : string){
    return this.form.controls[ctrl];
  }

  public getClass(ctrl : string) : string{
    if(!this.get(ctrl).touched){
      return '';
    }
    return this.get(ctrl).valid ? 'is-valid' : 'is-invalid';
  }

  public next(){
    this.form.markAllAsTouched();
    if(this.form.valid){

    }else{
      this.alert.warn('Complete los campos necesarios');
    }
  }
}
