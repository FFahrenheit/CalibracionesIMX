import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GaugesService } from 'src/app/services/gauges.service';
import { AlertService } from 'src/app/shared/alert';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {

  public form: FormGroup;
  
  @ViewChild('operator') private operator: ElementRef;
  @ViewChild('gauge') private gauge: ElementRef;

  public gauges = [];

  constructor(private fb            : FormBuilder,
              private alert         : AlertService,
              private gaugesService : GaugesService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      operator: ['', Validators.required],
      gauge: [''],
      scanner: [true]
    });

    setTimeout(() => {
      this.operator.nativeElement.focus();
    }, 100);

  }

  public get(ctrl: string): AbstractControl {
    return this.form.controls[ctrl];
  }

  public getClass(ctrl: string): string {
    if (this.get(ctrl).untouched) {
      return '';
    }
    return this.get(ctrl).valid ? 'is-valid' : 'is-invalid';
  }

  public setEmployee($event = null) {
    if ($event) {
      $event.preventDefault();
    }
    this.gauge.nativeElement.focus();
  }

  public addGauge($event = null) {
    if($event){
      $event.preventDefault();
    }
    this.gauge.nativeElement.focus();
    this.add();
  }

  public add(){
    let id = this.get('gauge').value;
    this.gaugesService.loadGauge(id)
        .subscribe(resp=>{
          this.get('gauge').setValue('');
          if(resp){
            this.appendGauge(this.gaugesService.getGuage());
          }else{
            this.alert.error(this.gaugesService.getError());
          }
        },error=>{
          this.get('gauge').setValue('');
          this.alert.error(this.gaugesService.getError()); 
        });
  }

  appendGauge(gauge : any){
    let name = `Gauge ${gauge.id} (${gauge.descripcion})`;
    console.log(gauge);
    
    if(gauge.activo != 'Activo'){
      return this.alert.warn('El ' + name +' no está activo y no se puede prestar');
    }
    
    if(gauge.estado != 'Calibración Vigente'){
      return this.alert.warn('El ' + name + ' no se encuentra calibrado correctamente');
    }
    
    if(gauge.prestatario != null){
      return this.alert.warn('El ' + name + ' ya se encuentra prestado');
    }

    let isRepeteaded = this.gauges.filter( p=> p.id == gauge.id );
    if(isRepeteaded.length > 0){
      return this.alert.warn('El ' + name + ' ya se encuentra en su lista de préstamos');
    }
    
    let toAdd = (( {id, descripcion, ubicacion, siguiente} ) => ( {id, descripcion, ubicacion, siguiente }))(gauge);    
    // this.alert.clear();
    this.alert.success(`${name} agregado a la lista`);
    this.gauges.push(toAdd);

  }

  public clearOperator() {
    this.get('operator').setValue('');
    this.get('operator').markAsUntouched();123
    123

    this.operator.nativeElement.focus();
  }

  public removeGauge(index : number){
    this.gauges.splice(index, 1);
  }

  test() {
    this.operator.nativeElement.focus();
    console.log('Test!');
  }
}
