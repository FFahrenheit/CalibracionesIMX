import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/shared/alert';

@Component({
  selector: 'app-delete-records',
  templateUrl: './delete-records.component.html',
  styleUrls: ['./delete-records.component.scss']
})
export class DeleteRecordsComponent implements OnInit {
  
  public form : FormGroup;

  constructor(private fb : FormBuilder,
              private alert : AlertService) { 
    this.form = this.fb.group({
      tipo : [ '', Validators.required],
      id : ['',  Validators.compose([Validators.required, Validators.pattern(/^(0|([1-9]\d*))$/)])]
    });
  }

  ngOnInit(): void {
  }

  public get(ctrl : string) : AbstractControl{
    return this.form.controls[ctrl];
  }

  public getClass(ctrl : string) : string{
    if(this.get(ctrl).untouched){
      return '';
    }
    return this.get(ctrl).valid ? 'is-valid' : 'is-invalid';
  }

  public next() : void{
    console.log('Are u sure?');
    this.alert.success('Registro eliminado');
  }

}
