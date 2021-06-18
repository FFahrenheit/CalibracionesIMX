import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'confirm-calibration-modal',
  templateUrl: './confirm-calibration-modal.component.html',
  styleUrls: ['./confirm-calibration-modal.component.scss']
})
export class ConfirmCalibrationModalComponent implements OnInit {

  @Input() public title = 'Confirmar acción';
  @Input() public content = '¿Deseas confirmar esta acción?';
  @Input() public trigger = 'Confirmar';
  @Input() public myClass = 'px-5 m-3';
  @Input() public isDisabled = false;
  @Input() public reason = 'Está actualmente deshabilitado';

  @Output() public accept = new EventEmitter<void>();
  @Output() public cancel = new EventEmitter<void>();
  @Output() public reject = new EventEmitter<void>();
  @Output() public triggered = new EventEmitter<void>();

  constructor(private modalService  : NgbModal) { }

  ngOnInit(): void {
  }

  open(content) {
    this.triggered.emit();
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      if(!this.isDisabled){
        switch (result) {
          case 'YES':
            this.accept.emit();
            break;
          case 'NO':
            this.reject.emit();
            break;
          default:
            this.cancel.emit();
            break;
        }
      }
    }, (reason) => {
      this.cancel.emit();
    });
  }

  areReasons(){
    return Array.isArray(this.reason);
  }
}
