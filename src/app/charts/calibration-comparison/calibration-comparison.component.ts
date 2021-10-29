import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { ChartsService } from 'src/app/services/charts.service';
import { AlertService } from 'src/app/shared/alert';

@Component({
  selector: 'app-calibration-comparison',
  templateUrl: './calibration-comparison.component.html',
  styleUrls: ['./calibration-comparison.component.scss']
})
export class CalibrationComparisonComponent implements OnInit {

  @ViewChild('canvasChart') canvasChart: ElementRef;

  private canvas;
  private myChart: Chart;

  private data;

  constructor(private alert   : AlertService,
              private charts  : ChartsService,
              private date    : DatePipe) { }


  ngOnInit(): void {
    this.charts.getComparisonChart().subscribe(
      resp => {
        if (resp) {
          this.initializeData(this.charts.getData());
        } else {
          this.alert.error(this.charts.getError());
        }
      }, error => {
        this.alert.error(this.charts.getError());
      }
    );
  }

  ngAfterViewInit() {
    this.canvas = this.canvasChart.nativeElement;

    this.myChart = new Chart(this.canvas, {
      type: 'bar',
      data: this.data,
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Número de calibraciones hechas en los últimos 30 días'
          },
          tooltip: {
            callbacks: {
              label: (context) =>{
                let label = context.dataset.label + ': ';

                label += Math.abs(context.parsed.y);
                return label;
              },
              footer: (items) => {
                let doneCounter = 0;
                let plannedCounter = 0;
                const index = items[0].parsed.x;
                this.data.datasets.forEach(d => {
                  let value = d.data[index];
                  if(value > 0){
                    doneCounter += value;
                  }else{
                    plannedCounter -= value;
                  }
                });
                return `Total hecho: ${ doneCounter }\nTotal planeado: ${ plannedCounter }`;
              }
            }
          }
        },
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true,
            ticks: {
              callback: (value, index, values) => {
                return value < 0 ? -value : value;
              }
            }
          }
        }
      }
    });

  }

  private initializeData(data: any) {
    this.data = {
      labels: data.map(d => this.date.transform(d.fecha, 'yyyy-MM-dd')),
      datasets: [
        {
          label: 'Equipos calibrados',
          data: data.map(d => d.equipos),
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 1)'
        },
        {
          label: 'Fixtures calibrados',
          data: data.map(d => d.fixtures),
          borderColor: 'rgb(54, 162, 235)',
          backgroundColor: 'rgba(54, 162, 235, 1)'
        },
        {
          label: 'Dummies calibrados',
          data: data.map(d => d.dummies),
          borderColor: 'rgb(255, 205, 86)',
          backgroundColor: 'rgba(255, 205, 86, 1)'
        },
        {
          label: 'Equipos planeados',
          data: data.map(d => d.equiposEsperados * -1),
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)'
        },
        {
          label: 'Fixtures planeados',
          data: data.map(d => d.fixturesEsperados * -1),
          borderColor: 'rgb(54, 162, 235)',
          backgroundColor: 'rgba(54, 162, 235, 0.5)'
        },
        {
          label: 'Dummies calibrados',
          data: data.map(d => d.dummiesEsperados * -1),
          borderColor: 'rgb(255, 205, 86)',
          backgroundColor: 'rgba(255, 205, 86, 0.5)',
        }
      ]
    }

    console.log(this.data);
    this.myChart.data = this.data;
    this.myChart.update();
  }

}
