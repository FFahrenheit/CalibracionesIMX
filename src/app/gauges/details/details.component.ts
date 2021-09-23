import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { AlertService } from 'src/app/shared/alert';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  public form : FormGroup;
  public searchId : string = '';

  @ViewChild('gauge') public gauge : ElementRef;

  constructor(private fb    : FormBuilder,
              private alert : AlertService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      gauge: ['']
    });
    
    setTimeout(() => {
      this.gauge.nativeElement.focus();
    }, 100);
  }

  public get(ctrl : string) : AbstractControl{
    return this.form.controls[ctrl];
  }

  public searchGauge($event = null) {
    if($event){
      $event.preventDefault();
    }
    this.gauge.nativeElement.focus();
    this.search();
  }

  public search() : void{
    console.log('Search!');
    let id = this.get('gauge').value.trim();

    if(id != ''){
      this.searchId = id;
    }
    else{
      this.alert.warn('Ingrese un código válido');
    }
  }

}
