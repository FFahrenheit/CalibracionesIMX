import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'confirm-calibration-modal',
  templateUrl: './confirm-calibration-modal.component.html',
  styleUrls: ['./confirm-calibration-modal.component.scss']
})
export class ConfirmCalibrationModalComponent implements OnInit {

  @Input() public title = 'Confirmar acción';
  @Input() public content = 'Por favor, verifique estos requerimientos antes de continuar';
  @Input() public trigger = 'Confirmar';
  @Input() public myClass = 'px-5 m-3';
  @Input() public isDisabled = false;
  @Input() public reason = 'Está actualmente deshabilitado';

  @Output() public accept = new EventEmitter<void>();
  @Output() public cancel = new EventEmitter<void>();
  @Output() public reject = new EventEmitter<void>();
  @Output() public triggered = new EventEmitter<void>();

  public form : FormGroup = Object.create(null);
  public touched : boolean = false;
  public modalReference;

  constructor(private modalService  : NgbModal,
              private fb            : FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      calibration: [false,Validators.compose([Validators.requiredTrue])],
      label: [false,Validators.compose([Validators.requiredTrue])]
    });
  }

  open(content) {
    this.triggered.emit();
    
    this.modalReference = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
    this.modalReference.result.then((result) => {
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

  confirm(){
    console.log(this.form.valid);
    console.log('XD');
    this.touched = true;
    if(this.form.valid){
      this.modalReference.close();
      this.accept.emit();
    }
  }
}
