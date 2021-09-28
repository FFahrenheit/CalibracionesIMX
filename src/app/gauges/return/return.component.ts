import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GaugesService } from 'src/app/services/gauges.service';
import { AlertService } from 'src/app/shared/alert';

@Component({
  selector: 'app-return',
  templateUrl: './return.component.html',
  styleUrls: ['./return.component.scss']
})
export class ReturnComponent implements OnInit {

  public form: FormGroup;
  
  @ViewChild('operator') private operator: ElementRef;
  @ViewChild('gauge') private gauge: ElementRef;

  public gauges = [];

  constructor(private fb            : FormBuilder,
              private alert         : AlertService,
              private gaugesService : GaugesService) { }

  ngOnInit(): void {
    // this.alert.clear();
    let isUsingScanner = (localStorage.getItem('scanner') || 'true') == 'true';
    this.form = this.fb.group({
      operator: ['', Validators.required],
      gauge: [''],
      scanner: [isUsingScanner],
      status: ['Devuelto', Validators.required],
      notes: ['']
    });

    setTimeout(() => {
      this.operator.nativeElement.focus();
    }, 100);

    this.get('scanner').valueChanges.subscribe(v =>{
      localStorage.setItem('scanner', String(v));
    });

    this.get('status').valueChanges.subscribe(v =>{
      if(v != 'Devuelto'){
        this.get('notes').setValidators(Validators.required);
      }else{
        this.get('notes').clearValidators();
      }
      this.get('notes').updateValueAndValidity();
      console.log(this.get('notes'));
    })
  }

  public get(ctrl: string): AbstractControl {
    return this.form.controls[ctrl];
  }

  public getClass(ctrl: string): string {
    if (this.get(ctrl).untouched || this.get(ctrl).disabled) {
      return '';
    }
    return this.get(ctrl).valid ? 'is-valid' : 'is-invalid';
  }

  public setEmployee($event = null) {
    if ($event) {
      $event.preventDefault();
    }
    if(this.get('operator').value.trim() == ''){
      this.get('operator').setValue('');
      return this.alert.warn('Ingrese un código de empleado válido');
    }

    let employee = this.get('operator').value.toUpperCase().trim().replace("'",'-');
    let regex = /^IMXG-[0-9]{1,}$/;

    if(!regex.test(employee)){
      this.get('operator').setValue('');
      return this.alert.warn('Este código de empleado no es válido');
    }
    this.get('operator').setValue(employee);

    setTimeout(() => {
      this.get('operator').disable();
    }, 100);
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
    let id = this.get('gauge').value.trim();

    if(id == ''){
      this.get('gauge').setValue('');
      return this.alert.warn('Ingrese un código válido');
    }
    if(id.startsWith('F') || id.startsWith('f')){
      id = id.substring(1);
    }
    if(isNaN(id)){
      this.get('gauge').setValue('');
      this.gauge.nativeElement.focus();
      return this.alert.error('Código de barras inválido');
    }
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
    
    if(gauge.prestatario == null){
      return this.alert.error('El ' + name + ' no se encuentra prestado');
    }

    let isRepeteaded = this.gauges.filter( p=> p.id == gauge.id );
    if(isRepeteaded.length > 0){
      return this.alert.error('El ' + name + ' ya se encuentra en su lista de retornos');
    }
    
    let toAdd = (( {id, descripcion, ubicacion, siguiente} ) => ( {id, descripcion, ubicacion, siguiente }))(gauge);    
    // this.alert.clear();
    this.alert.success(`${name} agregado a la lista`);
    this.gauges.push(toAdd);

  }

  public clearOperator() {
    this.get('operator').enable();
    this.get('operator').setValue('');
    this.get('operator').markAsUntouched();
    this.operator.nativeElement.focus();
  }

  public removeGauge(index : number){
    this.gauges.splice(index, 1);
  }

  public confirm() : void{
    let devices : string[] = this.gauges.map(g => g.id);
    console.log(devices);
    let operator = this.get('operator').value as string;
    let status = this.get('status').value as string;
    let notes = this.get('notes').value as string;

    this.gaugesService.returnGauges(operator, devices, status, notes)  
        .subscribe(resp=>{
          if(resp){
            this.alert.success(devices.length + ' guages retornados por ' + operator + ' con éxito');
            setTimeout(() => {
              window.location.reload();
            }, 3000);
          }else{
            this.alert.error(this.gaugesService.getError());
          }
        },error=>{
          this.alert.clear();
          this.alert.error(this.gaugesService.getError());
        });
  }

  public getReasons() : string[]{
    let reasons = [];
    if(this.gauges.length == 0){
      reasons.push('Agregue al menos un Gauge a regresar');
    }
    if(this.get('operator').invalid){
      reasons.push('Ingrese el código válido del empleado que retorna');
    }
    if(this.get('status').invalid){
      reasons.push('Seleccione el estado de retorno');
    }
    if(this.get('notes').invalid){
      reasons.push('Agregue notas de retorno');
    }

    return reasons;
  }

  public enable() : void{
    this.get('operator').enable();
  }
  
  public disableInput() : void{
    let op = this.get('operator');

    op.setValue(op.value.toUpperCase().trim());
    if(this.get('operator').valid){
      op.disable();
      this.gauge.nativeElement.focus();
    }else if(this.get('operator').value != ''){
      this.alert.warn('Código de empleado no válido');
      this.get('operator').setValue('');
      this.operator.nativeElement.focus();
    }
  }
}
