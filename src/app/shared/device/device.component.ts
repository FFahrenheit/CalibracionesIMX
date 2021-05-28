import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss']
})
export class DeviceComponent implements OnInit {

  @Input() id : string | null = '';
  @Input() title : string = 'Ver';

  public tests = Array(8).fill(0).map(Number.call, Number);

  constructor() { }

  ngOnInit(): void {
  }

}
