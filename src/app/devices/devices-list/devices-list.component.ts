import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-devices-list',
  templateUrl: './devices-list.component.html',
  styleUrls: ['./devices-list.component.scss']
})
export class DevicesListComponent implements OnInit {

  public tests = Array(8).fill(0).map(Number.call, Number);

  constructor() { }

  ngOnInit(): void {
  }

}
