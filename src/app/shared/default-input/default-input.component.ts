import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { merge, Observable, OperatorFunction, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';

@Component({
  selector: 'default-input',
  templateUrl: './default-input.component.html',
  styleUrls: ['./default-input.component.scss']
})
export class DefaultInputComponent implements OnInit {

  @Input() public param = 'ubicacion';
  @Input() public placeholder = 'Ubicación del equipo';
  @Input() public values = [];
  @Input() public model : any = 'XD';
  @Input() public marked = false;

  @Output() public onType = new EventEmitter<string>();

  public form : FormGroup = Object.create(null);

  @ViewChild('instance', {static: true}) instance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  constructor(private fb  : FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      param: [this.model]
    });
  }

  public get(){
    return this.form.controls['param'];
  }

  search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
    const inputFocus$ = this.focus$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => (term === '' ? this.values
        : this.values.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    );
  }

  getStyle(){
    this.onType.emit(this.get().value || '');
    if(this.marked  && this.get().value != '' && this.get().value != null ){
      return 'is-valid';
    }
    return this.get().touched && this.get().value != '' && this.get().value != null ? 'is-valid' : '';
  }

  public setValue(value : string){
    this.get().setValue(value);
  }
}
