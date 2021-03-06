import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import { ChartsService } from 'src/app/services/charts.service';
import { AlertService } from 'src/app/shared/alert';

@Component({
  selector: 'app-next-calibrations',
  templateUrl: './next-calibrations.component.html',
  styleUrls: ['./next-calibrations.component.scss']
})
export class NextCalibrationsComponent implements OnInit, AfterViewInit {

  @ViewChild('canvasChart') canvasChart: ElementRef;

  private canvas;
  private myChart: Chart;

  private data;

  constructor(private alert: AlertService,
    private charts: ChartsService,
    private date: DatePipe) { }

  ngOnInit(): void {
    this.charts.getNextChart().subscribe(
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
      type: 'line',
      data: this.data,
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Número de calibraciones a expirar en los próximos 30 días'
          }
        },
      }
    });

  }

  private initializeData(data: any) {
    this.data = {
      labels: data.map(d => this.date.transform(d.fecha, 'yyyy-MM-dd')),
      datasets: [
        {
          label: 'Equipos (INT)',
          data: data.map(d => d.equipos),
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)'
        },
        {
          label: 'Fixtures (FIX)',
          data: data.map(d => d.fixtures),
          borderColor: 'rgb(54, 162, 235)',
          backgroundColor: 'rgba(54, 162, 235, 0.5)'
        },
        {
          label: 'Dummies (DUM)',
          data: data.map(d => d.dummies),
          borderColor: 'rgb(255, 205, 86)',
          backgroundColor: 'rgba(255, 205, 86, 0.5)'
        },
        {
          label: 'Total',
          data: data.map(d => d.total),
          borderColor: 'rgb(180,180,180)',
          backgroundColor: 'rgba(180,180,180, 0.7)',
          borderDash: [10, 5],
          pointRadius: 2,
        }
      ]
    }

    console.log(this.data);
    this.myChart.data = this.data;
    this.myChart.update();
  }

}
