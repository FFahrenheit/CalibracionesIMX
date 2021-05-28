import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-device',
  templateUrl: './view-device.component.html',
  styleUrls: ['./view-device.component.scss']
})
export class ViewDeviceComponent implements OnInit {

  public id : string | null = '';

  constructor(private route:  ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params=> {
      this.id = params.get('id');
    });
  }

}
