import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { adminOptions, mediumOptions, profileOptions } from 'src/app/resources/dashboard.component.options';
import { adminSidebar, mediumSidebar, publicSidebar } from 'src/app/resources/dashboard.component.sidebar';
import { simpleOptions } from 'src/app/resources/simple.component.options';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-simple',
  templateUrl: './simple.component.html',
  styleUrls: ['./simple.component.scss']
})
export class SimpleComponent implements OnInit {

  public user : User | undefined = Object.create(null);
  public isAdmin = false;
  public publicDropdown;
  public adminDropdown;
  public simpleOptions = simpleOptions;

  public sidebar : any;

  constructor(private router  : Router,
              private login  : LoginService) { }

  ngOnInit(): void {

    this.user = this.login.getLoggedUser();

    this.isAdmin = this.login.isAdmin();

    this.sidebar = publicSidebar;
    this.publicDropdown = profileOptions;
    
    if(this.isAdmin || this.login.isLender()){
      this.publicDropdown = this.publicDropdown.concat(mediumOptions[1]);
    }
    if(this.isAdmin){
      this.sidebar = this.sidebar.concat(adminSidebar, mediumSidebar)
      this.adminDropdown = adminOptions;
    }else if(this.login.isLender()){
      this.sidebar = this.sidebar.concat(mediumSidebar);
    }

  }

  public goTo(route : string[]) : void{
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
      default:
        console.log('Not yet implemented');
    }
  }

  private goToFull(){
    this.router.navigate(['']);
  }

  private goToGauges(){
    this.router.navigate(['gauges']);
  }

  private deleteRecords(){
    this.router.navigate(['usuarios','admin','eliminar']);
  }

  private addUser(){
    this.router.navigate(['usuarios','nuevo']);
  }

  public isActive(url : string[]) : boolean{
    return ('/' + url.join('/') == this.router.url);
  }

}
