import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'filter',
  templateUrl: './filter-modal.component.html',
  styleUrls: ['./filter-modal.component.scss']
})
export class FilterModalComponent implements OnInit {

  public filterForm : FormGroup = Object.create(null);
  public filters : string[];
  public touched = false;
  public blocked : string[] = [];

  @Input() public trigger = 'Aplicar filtros';
  @Input() public title = 'Filtrar equipos';

  @Output() public apply = new EventEmitter<any>();
  @Output() public cancel = new EventEmitter<any>();
  @Output() public reset = new EventEmitter<any>();

  constructor(private modalService  : NgbModal,
            private fb              : FormBuilder) { }

  ngOnInit(): void {
    let saved = {}; //Once service  is created

    this.filterForm = this.fb.group({

    });
  }

  public open(content){
    this.modalService.open(content,{ariaLabelledBy: 'modal-basic-title'}).result.then(result=>{
      switch(result){
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
    });
  }

  public resetForm() : void{
    this.reset.emit();
    this.filterForm.reset(); 
  }

}
