import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss']
})
export class ProfileViewComponent implements OnInit {

  @Input() public user : User;
  @Input() public profileTitle = '';
  @Input() public autoLoad = false;

  constructor(private loginService : LoginService) { }

  ngOnInit(): void {
    if(this.autoLoad){
      this.user = this.loginService.getLoggedUser();
    }
    this.profileTitle = 'Perfil de ' + this.user.nombre
  }

}
