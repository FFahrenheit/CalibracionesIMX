import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error503',
  templateUrl: './error503.component.html',
  styleUrls: ['./error503.component.scss']
})
export class Error503Component implements OnInit {

  constructor(private router : Router) { }

  ngOnInit(): void {
  }

  goBack(){
    sessionStorage.removeItem('index');
    this.router.navigate(['']);
  }

}
