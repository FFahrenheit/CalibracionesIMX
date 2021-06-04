import { Component, Input, OnInit } from '@angular/core';
import { IconsAlert } from 'src/app/util/icons.alert';

@Component({
  selector: 'attr',
  templateUrl: './attribute.component.html',
  styleUrls: ['./attribute.component.scss']
})
export class AttributeComponent implements OnInit {

  @Input() public name = 'Title';
  @Input() public value = 'Value';
  @Input() public status = '';
  public icons = IconsAlert.icons;

  constructor() { }

  ngOnInit(): void {
  }

}
