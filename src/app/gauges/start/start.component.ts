import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {

  public form: FormGroup;
  
  @ViewChild('operator') private operator: ElementRef;
  @ViewChild('gauge') private gauge: ElementRef;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      operator: ['', Validators.required],
      gauge: [''],
      scanner: [true]
    });

    setTimeout(() => {
      this.operator.nativeElement.focus();
    }, 100);

  }

  public get(ctrl: string): AbstractControl {
    return this.form.controls[ctrl];
  }

  public getClass(ctrl: string): string {
    if (this.get(ctrl).untouched) {
      return '';
    }
    return this.get(ctrl).valid ? 'is-valid' : 'is-invalid';
  }

  public setEmployee($event = null) {
    if ($event) {
      $event.preventDefault();
    }
    this.gauge.nativeElement.focus();
  }

  public addGauge($event = null) {
    if($event){
      $event.preventDefault();
    }
    this.gauge.nativeElement.focus();
  }

  public clearOperator() {
    this.get('operator').setValue('');
    this.get('operator').markAsUntouched();
    this.operator.nativeElement.focus();
  }
6 
  test() {
    this.operator.nativeElement.focus();
    console.log('Test!');
  }
}
