import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  private count = 0;

  constructor(private router : Router) { }

  ngOnInit(): void {
  }

  public easterEgg(){
    this.count += 1;
    if(this.count == 3){
      this.router.navigate(['path','to','easter','egg']);
      this.count = 0;
    }
  }

}
