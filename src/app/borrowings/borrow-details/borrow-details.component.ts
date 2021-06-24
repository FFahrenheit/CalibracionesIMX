import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-borrow-details',
  templateUrl: './borrow-details.component.html',
  styleUrls: ['./borrow-details.component.scss']
})
export class BorrowDetailsComponent implements OnInit {

  public id : string | null = '';

  constructor(private route:  ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params=> {
      this.id = params.get('id');
    });
  }

}
