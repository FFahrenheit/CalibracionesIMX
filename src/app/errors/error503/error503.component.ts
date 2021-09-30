import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

const maintenance = environment.maintenance;

@Component({
  selector: 'app-error503',
  templateUrl: './error503.component.html',
  styleUrls: ['./error503.component.scss']
})
export class Error503Component implements OnInit {

  constructor(private router : Router) { }

  ngOnInit(): void {
    if(!maintenance){
      this.router.navigate(['']);
    }
  }

  goBack(){
    sessionStorage.removeItem('index');
    this.router.navigate(['equipos','ver']);
  }

}
