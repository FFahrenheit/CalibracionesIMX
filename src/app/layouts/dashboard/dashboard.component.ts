import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { User } from 'src/app/models/user.model';
import { LoginService } from 'src/app/services/login.service';
import { publicSidebar, adminSidebar, mediumSidebar } from 'src/app/resources/dashboard.component.sidebar';
import { profileOptions, adminOptions, mediumOptions } from 'src/app/resources/dashboard.component.options';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public selectedIndex : number = 0;
  public shown : boolean = true;
  public user : User | undefined = Object.create(null);
  public isAdmin = false;
  public publicDropdown;
  public adminDropdown;

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

    this.isAdmin = this.login.isAdmin();

    this.sidebar = publicSidebar;
    this.publicDropdown = profileOptions;


    if(this.isAdmin || this.login.isLender()){
      this.publicDropdown = this.publicDropdown.concat(mediumOptions[0]);
      console.log(this.publicDropdown);
    }
    if(this.isAdmin){
      this.sidebar = this.sidebar.concat(adminSidebar, mediumSidebar)
      this.adminDropdown = adminOptions;
    }else if(this.login.isLender()){
      this.sidebar = this.sidebar.concat(mediumSidebar);
    }

    this.getMode();
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

  public goToAdmins(){
    this.router.navigate(['usuarios','encargados']);
  }

  public changePassword(){
    this.router.navigate(['usuarios','seguridad','cambiar'])
  }

  public handleClick(event : string){
    switch(event){
      case 'logout':
        this.logout();
        break;
      case 'admins':
        this.goToAdmins();
        break;
      case 'change':
        this.changePassword();
        break;
      case 'add':
        this.addUser();
        break;
      case 'delete':
        this.deleteRecords();
        break;
      case 'gauges':
        this.goToGauges();
        break;
      case 'full':
        this.goToFull();
        break;
      case 'dark':
        this.toggleDarkMode();
        break;
      default:
        console.log('Not yet implemented');
    }
  }

  private getMode() : void{
    let opt = this.publicDropdown.filter(p => p.listener == 'dark')[0];
    console.log(opt);
    if (!opt){
      return;
    }
    if( this.isDarkMode() ){
      opt.title = 'Modo día';
      opt.icon = 'fas fa-sun';
    }else{
      opt.title = 'Modo noche';
      opt.icon = 'fas fa-moon';
    }
  }

  public isDarkMode() : boolean{
    const darkMode = localStorage.getItem('dark') || 'false';
    return darkMode == 'true';
  }

  private toggleDarkMode() : void{
    const html = document.getElementsByTagName('html')[0];

    if( this.isDarkMode() ){
      localStorage.setItem('dark', 'false');
      html.dataset.theme = '';
    } else { 
      localStorage.setItem('dark', 'true');
      html.dataset.theme = 'dark-mode';
    }

    this.getMode();
  }

  private goToFull(){
    this.router.navigate(['']);
  }

  public goToGauges(){
    this.router.navigate(['gauges']);
  }

  private deleteRecords(){
    this.router.navigate(['usuarios','admin','eliminar']);
  }

  private addUser(){
    this.router.navigate(['usuarios','nuevo']);
  }

}
