import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
      gauge: ['', Validators.required]
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
    let id = this.get('gauge').value.trim();

    if(id != ''){
      if(id.startsWith('F') || id.startsWith('f')){
        id = id.substring(1);
      }

      if(isNaN(id)){
        this.get('gauge').setValue('');
        this.gauge.nativeElement.focus();
        return this.alert.error('Código de barras inválido');
      }else{
        this.searchId = id;
      }
      this.clearSearch();
    }
    this.gauge.nativeElement.focus();
  }

  public loaded($event){
    this.clearSearch();
  }

  public clearSearch() : void{
    this.get('gauge').setValue('');
    this.gauge.nativeElement.focus()
  }

}
