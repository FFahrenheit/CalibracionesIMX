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
    this.alert.clear();
    let isUsingScanner = (localStorage.getItem('scanner') || 'true') == 'true';
    this.form = this.fb.group({
      operator: ['', Validators.required],
      gauge: [''],
      scanner: [isUsingScanner]
    });

    setTimeout(() => {
      this.operator.nativeElement.focus();
    }, 100);

    this.get('scanner').valueChanges.subscribe(v =>{
      localStorage.setItem('scanner', String(v));
    });

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
    let employee = this.get('operator').value.toUpperCase().trim();
    let regex = /^IMXG'[0-9]{1,}$/;

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
    
    if(gauge.activo != 'Activo'){
      return this.alert.error('El ' + name +' no está activo y no se puede prestar');
    }
    
    if(gauge.estado != 'Calibración Vigente'){
      return this.alert.error('El ' + name + ' no se encuentra calibrado correctamente');
    }
    
    if(gauge.prestatario != null){
      return this.alert.error('El ' + name + ' ya se encuentra prestado');
    }

    let isRepeteaded = this.gauges.filter( p=> p.id == gauge.id );
    if(isRepeteaded.length > 0){
      return this.alert.error('El ' + name + ' ya se encuentra en su lista de préstamos');
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

    this.gaugesService.lendGauges(operator, devices)  
        .subscribe(resp=>{
          if(resp){
            this.alert.success(devices.length + ' guages prestados a ' + operator + ' con éxito');
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
      reasons.push('Agregue al menos un Gauge a prestar');
    }
    if(this.get('operator').invalid){
      reasons.push('Ingrese el código de empleado prestatario válido');
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
