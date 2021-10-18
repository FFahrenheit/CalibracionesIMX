import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import { ChartsService } from 'src/app/services/charts.service';
import { AlertService } from 'src/app/shared/alert';

@Component({
  selector: 'app-borrows-overall',
  templateUrl: './borrows-overall.component.html',
  styleUrls: ['./borrows-overall.component.scss']
})
export class BorrowsOverallComponent implements OnInit {

  @ViewChild('canvasChart') canvasChart: ElementRef;

  private canvas;
  private myChart: Chart;

  private data;

  constructor(private alert : AlertService,
              private charts: ChartsService,
              private date  : DatePipe) { }

  ngOnInit(): void {
    this.charts.getBorrowsOverallChart().subscribe(
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
            text: 'Flujo de préstamos en los últimos 30 días'
          }
        }
      }
    });

  }

  private initializeData(data: any) {
    this.data = {
      labels: data.map(d => this.date.transform(d.fecha,'yyyy-MM-dd')),
      datasets: [
        {
          label: 'Equipos prestados',
          data: data.map(d => d.entregados),
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)'
        },
        {
          label: 'Equipos regresados',
          data: data.map(d => d.regresados),
          borderColor: 'rgb(54, 162, 235)',
          backgroundColor: 'rgba(54, 162, 235, 0.5)'
        },
        {
          label: 'Equipos en préstamo',
          data: data.map(d => d.prestados),
          borderColor: 'rgb(255, 205, 86)',
          backgroundColor: 'rgba(255, 205, 86, 0.5)'
        }
      ]
    }

    console.log(this.data);
    this.myChart.data = this.data;
    this.myChart.update();
  }

}
