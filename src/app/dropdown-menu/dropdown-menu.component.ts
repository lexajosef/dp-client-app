import { Component, OnInit, Input, ContentChildren, QueryList, AfterContentInit } from '@angular/core';
import { MenuItemComponent } from '../menu-item/menu-item.component';

@Component({
  selector: 'ui-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.css']
})
export class DropdownMenuComponent implements AfterContentInit {

  @ContentChildren(MenuItemComponent) menuItems: QueryList<MenuItemComponent>;

  @Input() title: string;
  @Input() btnStyleClass: string;

  items: MenuItemComponent[];

  constructor() { }

  ngAfterContentInit(): void {
    this.items = this.menuItems.toArray();
  }

}
