import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { User } from 'src/app/models/user.model';
import { LoginService } from 'src/app/services/login.service';
import { publicSidebar } from './dashoard.component.sidebar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public tests = Array(8).fill(0).map(Number.call, Number);
  public selectedIndex : number = 0;
  public shown : boolean = true;
  public user : User | undefined = Object.create(null);

  public sidebar : any;

  constructor(private router  : Router,
              private login  : LoginService) { }

  ngOnInit(): void {
    this.selectedIndex = Number(sessionStorage.getItem('index')) || 0;
    $("#menu-toggle").click((e:any)=> {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
    });

    this.user = this.login.getLoggedUser();

    if(this.user?.posicion == 'usuario'){
      this.sidebar = publicSidebar;
    }
  }

  public goTo(route : string[],index : number) : void{
    this.selectedIndex = index;
    sessionStorage.setItem('index',String(index));
    this.router.navigate(route);
  }

  public logout() : void {
    this.login.logout();
    this.router.navigate(['inicio','login']);
  }

}
