import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { chartOptions } from 'src/app/resources/chart.component.options';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {

  public charts = chartOptions;
  public selected;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.checkRoute();
    this.router.events.subscribe(e => {
      this.checkRoute();
    });
  }

  private checkRoute(){
    const link = this.router.url.split('/');
    let route = link[link.length - 1];
    this.selected = this.charts.filter(c => c.route == route)[0];
  }

  public isActive(item: string): boolean {
    return this.selected.route == item;
  }

  public goToChart(item: string) {
    this.router.navigate(['charts', item]);
  }

}
