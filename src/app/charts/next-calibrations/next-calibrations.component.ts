import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-next-calibrations',
  templateUrl: './next-calibrations.component.html',
  styleUrls: ['./next-calibrations.component.scss']
})
export class NextCalibrationsComponent implements OnInit, AfterViewInit {

  @ViewChild('canvasChart') canvasChart : ElementRef;

  private canvas;
  private ctx;
  private myChart : Chart;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    this.canvas = this.canvasChart.nativeElement;
    this.ctx = this.canvas.getContext('2d');

    this.myChart = new Chart(this.canvas, {
      type: 'pie',
      data:{
        labels: ['R', 'G', 'B'],
        datasets: [{
          label: 'Interest in charts',
          data: [30, 50, 100],
          backgroundColor:  ['rgb(255, 99, 132)','rgb(54, 162, 235)','rgb(255, 205, 86)'],
          hoverOffset: 4
        }]
      }
    });
  }

}
