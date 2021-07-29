import { TitleCasePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DevicesService } from 'src/app/services/devices.service';
import { estados, activos } from 'src/app/resources/device.component.statuses'
import { DefaultInputComponent } from '../default-input/default-input.component';
import { FixedInputsService } from 'src/app/services/fixed-inputs.service';

@Component({
  selector: 'filter',
  templateUrl: './filter-modal.component.html',
  styleUrls: ['./filter-modal.component.scss']
})
export class FilterModalComponent implements OnInit {

  public filterForm: FormGroup = Object.create(null);
  public filters: string[];
  public touched = false;
  public resetTrigger = false;

  @Input() public trigger = 'Aplicar filtros';
  @Input() public title = 'Filtrar equipos';
  @Input() public message = 'Seleccione los filtros a aplicar a los equipos';
  @Input() public blocked: string[] = [];

  @Output() public apply = new EventEmitter<any>();
  @Output() public cancel = new EventEmitter<any>();
  @Output() public reset = new EventEmitter<any>();

  public estados = estados;
  public activos = activos;

  @ViewChild(DefaultInputComponent) ubicacion : DefaultInputComponent;
  public ubicaciones;
  public defaultLocation;

  constructor(private modalService    : NgbModal,
              private fb              : FormBuilder,
              private titleCase       : TitleCasePipe,
              private devicesService  : DevicesService,
              private getterService   : FixedInputsService) { }

  ngOnInit(): void {
    let saved = this.devicesService.getSavedFilters();

    this.filterForm = this.fb.group({
      id: [saved?.id || ''],
      tipo: [saved?.tipo || null],
      serie: [saved?.serie || ''],
      descripcion: [saved?.descripcion || ''],
      estado: [saved?.estado || null],
      activo: [saved?.activo || null],
      ubicacion: [saved?.ubicacion || ''],
      calibracion: [saved?.calibracion || null],
      periodo: [saved?.periodo || ''],
      fromUltima: [saved?.fromUltima || ''],
      toUltima: [saved?.toUltima || ''],
      fromSiguiente: [saved?.fromSiguiente || ''],
      toSiguiente: [saved?.toSiguiente || ''],
      fromRemaining: [saved?.fromRemaining || ''],
      toRemaining: [saved?.toRemaining || ''],
      prestatario: [saved?.prestatario],
      prestado: [saved.prestado || null],
    });

    this.apply.emit(this.getValues());

    this.getterService.loadLocations()
    .subscribe(resp=>{
      if(resp){
        this.ubicaciones = this.getterService.getLocations();
      }else{
        console.log(this.getterService.getError());
      }
    },error=>{
      console.log(this.getterService.getError());
    });
  }

  ngAfterViewInit(){
  }

  public open(content) {
    this.defaultLocation = this.filterForm.controls['ubicacion'].value || '';

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(result => {
      switch (result) {
        case 'YES':
          const obj = this.getValues();
          this.apply.emit(obj);
          this.touched = true;
          break;
        case 'NO':
          break;
        default:
          console.log('Cancel');
          break;
      }
    }, reason =>{
      this.cancel.emit();
    });
  }

  public resetForm(): void {
    this.filterForm.reset();
    this.resetTrigger = !this.resetTrigger;

  }

  public getClass(ctrl: string): string {
    const control = this.filterForm.controls[ctrl];
    return !control.touched || control.value == '' ? '' : 'is-valid';
  }

  private  getValues(){
    let filterObject : any = {};
    this.filters = [];
    const tipos = {
      'INT' : 'Equipo',
      'FIX' : 'Fixture',
      'DUM-' : 'Dummy'
    };

    Object.keys(this.filterForm.controls).forEach(key=>{
      let control = this.filterForm.controls[key].value;
      
      if(control != null && control != ''){

        filterObject[key] = control;
        
        let filter;

        switch(key){
          case 'tipo':
            filter = 'Tipo : ' + tipos[control];
            break;
          case 'prestado':
            filter = control == 'IS NULL' ? 'Disponible para préstamo' : 'Prestado';
            break;
          case 'calibracion':
            filter = 'Tipo de calibración : ' + this.titleCase.transform(control);
            break;
          case 'estado':
            filter = 'Estado de calibración : ' + control;
            break;
          case 'activo':
            filter = 'Estado de equipo : ' + control;
            break;
          case 'fromRemaining':
            filter = 'Calibracion desde dentro de : ' + control + ' días';
            break;
          case 'toRemaining':
            filter = 'Calibracion hasta dentro de : ' + control + ' días';
            break;
          case 'fromUltima':
            filter = 'Ultima desde : ' + control;
            break;
          case 'toUltima':
            filter = 'Ultima hasta : ' + control;
            break;
          case 'fromSiguiente':
            filter = 'Siguiente desde : ' + control;
            break;
          case 'toSiguiente':
            filter = 'Siguiente hasta : ' + control;
            break;
          case 'periodo':
            filter = 'Calibración cada ' + control + ' meses';
            break;
          case 'id':
            filter = 'ID : ' + control;
            break;
          default:
            filter = this.titleCase.transform(key + ' : ' + control);
            break;
        }
        
        this.filters.push(filter);
      }
    });

    return filterObject;
  }

  public updateUbicacion(value : string){
    this.filterForm.controls['ubicacion'].setValue(value);
  }
}
