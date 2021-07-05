import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { merge, Observable, OperatorFunction, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { FixedInputsService } from 'src/app/services/fixed-inputs.service';

@Component({
  selector: 'default-input',
  templateUrl: './default-input.component.html',
  styleUrls: ['./default-input.component.scss']
})
export class DefaultInputComponent implements OnInit {

  @Input() public param = 'ubicacion';
  @Input() public placeholder = 'Ubicación del equipo';

  @Output() public onType = new EventEmitter<string>();

  public values = [];
  public form : FormGroup = Object.create(null);

  @ViewChild('instance', {static: true}) instance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();
  public model : any;

  constructor(private getterService : FixedInputsService,
              private fb            : FormBuilder) { }

  ngOnInit(): void {
    this.getterService.loadLocations()
        .subscribe(resp=>{
          if(resp){
            this.values = this.getterService.getLocations();
            
            console.log([this.values,'XD']);
          }else{
            console.log(this.getterService.getError());
          }
        },error=>{
          console.log(this.getterService.getError());
        });
    this.form = this.fb.group({
      param: ['']
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

  update(){
    this.onType.emit(this.get().value || '');
  }

  getStyle(){
    return this.get().touched && this.get().value != '' ? 'is-valid' : '';
  }
}
