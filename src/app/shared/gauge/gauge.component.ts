import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'gauge',
  templateUrl: './gauge.component.html',
  styleUrls: ['./gauge.component.scss']
})
export class GaugeComponent implements OnInit {

  @Input() public id : string = '';
  
  public status = null;

  constructor() { }

  ngOnInit(): void {
  }

}
