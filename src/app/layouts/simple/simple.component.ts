import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { adminOptions, profileOptions } from 'src/app/resources/dashboard.component.options';
import { adminSidebar, mediumSidebar, publicSidebar } from 'src/app/resources/dashboard.component.sidebar';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-simple',
  templateUrl: './simple.component.html',
  styleUrls: ['./simple.component.scss']
})
export class SimpleComponent implements OnInit {

  public selectedIndex : number = 0;
  public shown : boolean = true;
  public user : User | undefined = Object.create(null);
  public isAdmin = false;
  public publicDropdown;
  public adminDropdown;

  public sidebar : any;

  constructor(private router : Router,
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

    if(this.isAdmin){
      this.sidebar = this.sidebar.concat(adminSidebar, mediumSidebar)
      this.adminDropdown = adminOptions;
    }else if(this.login.isLender()){
      this.sidebar = this.sidebar.concat(mediumSidebar);
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
      default:
        console.log('Not yet implemented');
    }
  }

  private deleteRecords(){
    this.router.navigate(['usuarios','admin','eliminar']);
  }

  private addUser(){
    this.router.navigate(['usuarios','nuevo']);
  }

}
