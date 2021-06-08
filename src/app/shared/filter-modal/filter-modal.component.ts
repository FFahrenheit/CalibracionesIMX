import { TitleCasePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'filter',
  templateUrl: './filter-modal.component.html',
  styleUrls: ['./filter-modal.component.scss']
})
export class FilterModalComponent implements OnInit {

  public filterForm: FormGroup = Object.create(null);
  public filters: string[];
  public touched = false;
  public blocked: string[] = [];

  @Input() public trigger = 'Aplicar filtros';
  @Input() public title = 'Filtrar equipos';
  @Input() public message = 'Seleccione los filtros a aplicar a los equipos';

  @Output() public apply = new EventEmitter<any>();
  @Output() public cancel = new EventEmitter<any>();
  @Output() public reset = new EventEmitter<any>();

  public estados = [
    '',
    'Baja',
    'Calibración Aceptada',
    'Calibración Pendiente',
    'Desactivado',
    'En Proceso de Calibración',
    'Extraviado',
    'N/A',
    'Referencia',
    'Reparacion'
  ];

  public activos = [
    '',
    'Activo',
    'Baja',
    'Desactivado',
    'Extraviado',
    'N/A',
    'Referencia',
    'Reparacion'
  ];

  constructor(private modalService  : NgbModal,
              private fb            : FormBuilder,
              private titleCase     : TitleCasePipe) { }

  ngOnInit(): void {
    let saved: any = {}; //Once service  is created

    this.filterForm = this.fb.group({
      id: [saved?.id || ''],
      serie: [saved?.serie || ''],
      descripcion: [saved?.descripcion || ''],
      estado: [saved?.estado || ''],
      activo: [saved?.activo || ''],
      ubicacion: [saved?.ubicacion || ''],
      periodo: [saved?.periodo || ''],
      fromUltima: [saved?.fromUltima || ''],
      toUltima: [saved?.toUltima || ''],
      fromSiguiente: [saved?.fromSiguiente || ''],
      toSiguiente: [saved?.toSiguiente || '']
    });

    this.apply.emit(this.getValues());
  }

  public open(content) {
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
    this.reset.emit();
    this.filterForm.reset();
  }

  public getClass(ctrl: string): string {
    const control = this.filterForm.controls[ctrl];
    return !control.touched || control.value == '' ? '' : 'is-valid';
  }

  private  getValues(){
    let filterObject : any = {};
    this.filters = [];

    Object.keys(this.filterForm.controls).forEach(key=>{
      let control = this.filterForm.controls[key].value;
      
      if(control != null && control != ''){

        filterObject[key] = control;
        
        let filter;

        switch(key){
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
            filter = 'Calibración cada ' + control + ' años';
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
}
