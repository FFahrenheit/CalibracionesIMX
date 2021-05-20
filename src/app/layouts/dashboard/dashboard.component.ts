import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public tests = Array(8).fill(0).map(Number.call, Number);
  public selectedIndex : number = 0;
  public shown : boolean = true;

  constructor(private router : Router) { }

  ngOnInit(): void {
    this.selectedIndex = Number(sessionStorage.getItem('index')) || 0;
    $("#menu-toggle").click((e:any)=> {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
    });
  }

  public goTo(route : string[],index : number) : void{
    this.selectedIndex = index;
    sessionStorage.setItem('index',String(index));
    return;
    this.router.navigate(route);
  }

}
