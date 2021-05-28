import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss']
})
export class DeviceComponent implements OnInit {

  @Input() id : string | null = '';

  constructor() { }

  ngOnInit(): void {
  }

}
