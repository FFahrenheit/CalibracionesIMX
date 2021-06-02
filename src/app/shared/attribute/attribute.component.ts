import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'attr',
  templateUrl: './attribute.component.html',
  styleUrls: ['./attribute.component.scss']
})
export class AttributeComponent implements OnInit {

  @Input() public name = 'Title';
  @Input() public value = 'Value';
  @Input() public status = '';
  public icons = {
    'ok' : 'fas fa-check-circle ok',
    'warning' : 'fas fa-exclamation-circle warning',
    'not-ok' : 'fas fa-exclamation-circle not-ok',
    'unknown' : 'fas fa-question-circle',
    'waiting' : 'fas fa-history warning'
  };

  constructor() { }

  ngOnInit(): void {
  }

}
