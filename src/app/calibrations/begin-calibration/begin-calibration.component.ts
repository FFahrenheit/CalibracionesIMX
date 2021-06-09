import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-begin-calibration',
  templateUrl: './begin-calibration.component.html',
  styleUrls: ['./begin-calibration.component.scss']
})
export class BeginCalibrationComponent implements OnInit {

  public id : string | null = '';
  public show = false;

  constructor(private route:  ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params=> {
      this.id = params.get('id');
    });
  }

  exists($event){
    console.log($event);
    this.show = $event;
  }

}
