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

  constructor(private modalService: NgbModal,
    private fb: FormBuilder) { }

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
  }

  public open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(result => {
      switch (result) {
        case 'YES':
          console.log('Yes');
          break;
        case 'NO':
          console.log('No')
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
}
