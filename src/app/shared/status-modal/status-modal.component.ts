import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { estados } from 'src/app/resources/device.component.statuses';

@Component({
  selector: 'status-option',
  templateUrl: './status-modal.component.html',
  styleUrls: ['./status-modal.component.scss']
})
export class StatusModalComponent implements OnInit {

  @Input() public title = 'Actualizar estado de calibración';
  @Input() public content = 'Por favor, seleccione el nuevo estado en la calibración';
  @Input() public trigger = 'Actualizar';
  @Input() public myClass = 'px-5 m-3';
  @Input() public isDisabled = false;
  @Input() public options = estados;
  @Input() public HtmlContent = '';

  @Output() public send = new EventEmitter<string>();
  @Output() public cancel = new EventEmitter<string>();
  @Output() public reject = new EventEmitter<string>();

  public form: FormGroup;
  public modalReference: any;

  constructor(private modalService  : NgbModal,
              private fb            : FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      estado: ['', Validators.compose([Validators.required])]
    });
  }

  public open(content) {
    if (!this.isDisabled) {
      this.modalReference = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
      this.modalReference.result.then(result => {
        switch (result) {
          case 'YES':
            this.send.emit(this.form.controls['estado'].value);
            break;
          case 'NO':
            this.reject.emit();
            break;
          default:
            this.cancel.emit();
            break;
        }
      }, close => {
        this.cancel.emit();
      });
    }
  }

  public submit(){
    if(!this.form.valid){
      this.form.markAllAsTouched();
    }else{
      this.modalReference.close();
      let comment : string = this.form.controls['estado'].value;
      this.send.emit(comment);
    }
  }

  public getClass(controlName : string) : string{
    let control = this.form.controls[controlName];
    if(!control.touched){
      return '';
    }
    return control.hasError('required') ? 'is-invalid' : 'is-valid'; 
  }

}
