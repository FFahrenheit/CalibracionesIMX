import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-easter-egg',
  templateUrl: './easter-egg.component.html',
  styleUrls: ['./easter-egg.component.scss']
})
export class EasterEggComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goBack() {
    setTimeout(() => {
      sessionStorage.removeItem('index');
      this.router.navigate(['']);
    }, 3000);
  }


}
