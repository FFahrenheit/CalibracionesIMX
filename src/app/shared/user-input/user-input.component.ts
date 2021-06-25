import { AfterContentInit, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'user-input',
  templateUrl: './user-input.component.html',
  styleUrls: ['./user-input.component.scss']
})
export class UserInputComponent implements OnInit, AfterContentInit {

  public form : FormGroup = Object.create(null);  ;

  public savedUser : any = {};
  public model : any;

  @Input() public users = [];
  @Input() public index = 0;
  @Input() public placeholder = 'Usuario';
  @Input() public defaultUser = {};
  
  @Output() public update = new EventEmitter();
  @Output() public valid = new EventEmitter();

  constructor(public fb : FormBuilder,
              private cdRef: ChangeDetectorRef) { 
  }
  
  ngAfterContentInit(){
    this.cdRef.detectChanges(); 

    if(this.defaultUser != null){
      this.form.controls['name'].setValue({
        name:this.defaultUser['responsable'], 
        username:this.defaultUser['username']
      });
    }
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      name:  [ '' ,Validators.compose([Validators.required])]
    });
  }

  get name(): any {
    return this.form.controls['name'];
  }

  search = (text$: Observable<string>) =>
  text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    map(term => term === '' ? []
      : this.users.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
  )

  formatter = (x: {name: string}) => x.name;

  getValidity(){
    let uName = this.name.value;

    this.name.setErrors({
      'incorrect': true
    });

    if(typeof uName === 'object' && typeof uName.name !== 'undefined'){
      this.name.setErrors(null);
      this.savedUser = uName;
    }

    this.users?.forEach(u=>{
      if(u.name == uName){
        this.name.setErrors(null);
        this.savedUser = u;
      }
    });

    return this.name.valid && !this.name.hasError('incorrect');
  }

  getStyle(){
    this.name.updateValueAndValidity({ onlySelf: true, emitEvent: true });

    if(!this.name.touched){
      return '';
    }
    this.isValid();
    let value = (this.name.valid && !this.name.hasError('incorrect')) ? 'is-valid' : 'is-invalid';
    if(value == 'is-valid'){
      this.valid.emit();
    }
    return value;
  }

  isValid(){
    let uName = this.name.value;

    this.name.setErrors({
      'incorrect': true
    });

    if(typeof uName === 'object' && typeof uName.name !== 'undefined'){
      this.name.setErrors(null);
      this.savedUser = uName;
    }

    this.users?.forEach(u=>{
      if(u.name == uName){
        this.name.setErrors(null);
        this.savedUser = u;
      }
    });

    if(this.name.valid && !this.name.hasError('incorrect')){
      let data = this.savedUser;
      data['index'] = this.index;
      this.update.emit(data);
    }else {
      this.update.emit(null);
    }
  }

  markAsTouched(){
    this.form.markAllAsTouched();
  }


}
