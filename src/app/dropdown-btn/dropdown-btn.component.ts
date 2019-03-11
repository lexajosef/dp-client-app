import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ui-dropdown-btn',
  templateUrl: './dropdown-btn.component.html',
  styleUrls: ['./dropdown-btn.component.css']
})
export class DropdownBtnComponent implements OnInit {

  @Input()
  title: string;

  @Input()
  btnStyleClass: string;

  constructor() { }

  ngOnInit() { }

}
