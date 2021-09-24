import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'device-simple',
  templateUrl: './device-simple.component.html',
  styleUrls: ['./device-simple.component.scss']
})
export class DeviceSimpleComponent implements OnInit {

  @Input() device : any = null;

  constructor() { }

  ngOnInit(): void {
  }

  getObject(){
    return JSON.stringify(this.device)
  }
}
