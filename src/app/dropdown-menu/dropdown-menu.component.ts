import { Component, Input, ContentChildren, QueryList, AfterContentInit, ViewChildren, ElementRef, 
    AfterViewInit, ViewChild, HostListener, AfterViewChecked } from '@angular/core';
import { MenuItemComponent } from '../menu-item/menu-item.component';
import * as KEYCODES from 'keycode-js';

@Component({
  selector: 'ui-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.css']
})
export class DropdownMenuComponent implements AfterContentInit, AfterViewInit, AfterViewChecked {

  @ContentChildren(MenuItemComponent) menuItems: QueryList<MenuItemComponent>;

  @Input() title: string;
  @Input() icon: string;
  @Input() btnStyleClass: string;
  @Input() menuPosition: string;

  @ViewChild('menuButton') menuButtonRef: ElementRef;
  @ViewChild('menu') menuRef: ElementRef;
  @ViewChildren('linkRef') linkRefs: QueryList<ElementRef>;

  items: MenuItemComponent[];
  links: HTMLElement[] = [];
  isMenuOpen: boolean = false;
  focusLinkAfterViewChecked: boolean = false;

  constructor() { }

  ngAfterContentInit(): void {
    // get items from menu-item.component
    this.items = this.menuItems.toArray();
  }

  ngAfterViewInit(): void {
    // store links html elements from link element refs
    this.linkRefs.forEach(link => this.links.push(link.nativeElement));
  }

  ngAfterViewChecked(): void {
    if (this.focusLinkAfterViewChecked) {
      // focus first link in menu
      this.links[0].focus();
      this.focusLinkAfterViewChecked = false;
    }
  }

  get menuButtonElement() { return this.menuButtonRef.nativeElement }
  get menuElement() { return this.menuRef.nativeElement }

  @HostListener('window:click', ['$event'])
  onWindowClick(ev: MouseEvent) {
    if (this.isMenuOpen && ev.target !== this.menuButtonElement && ev.target !== this.menuElement) {
      this.closeMenu();
    }
  }

  onMenuClick(ev: MouseEvent) {
    this.isMenuOpen ? this.closeMenu() : this.openMenu();
    ev.stopPropagation(); // do not propagate event, it would be caught in window click event
  }

  onMenuKeydown(ev: KeyboardEvent) {
    if (ev.keyCode === KEYCODES.KEY_UP || ev.keyCode === KEYCODES.KEY_DOWN) {
      this.openMenu();
    }
  }

  private closeMenu() {
    this.isMenuOpen = false;
    this.menuButtonElement.focus();
  }

  private openMenu() {
    this.isMenuOpen = true;
    // set flag for focus first link, focus is set after AfterViewChecked event
    this.focusLinkAfterViewChecked = true;
  }

  private checkKeyboardCloseMenu(ev: KeyboardEvent) {
    if (ev.keyCode === KEYCODES.KEY_ESCAPE || ev.keyCode === KEYCODES.KEY_TAB) {
      this.closeMenu();
      ev.preventDefault();
    }
  }

  private getActiveItemIndex(): number {
    let result = -1;
    this.links.forEach((item, index) => {
      if (item === document.activeElement) {
        result = index;
      }
    });

    return result;
  }

  menuKeyboardAccessibility(ev: KeyboardEvent) {
    this.checkKeyboardCloseMenu(ev);

    switch (ev.keyCode) {
      // focus previous item or wrapping to the last one
      case KEYCODES.KEY_UP:
        if (document.activeElement === this.links[0]) {
          this.links[this.links.length - 1].focus();
        } else {
          this.links[this.getActiveItemIndex() - 1].focus();
        }
        break;
    
      // focus next item or wrapping to the first one
      case KEYCODES.KEY_DOWN:
        if (document.activeElement === this.links[this.links.length - 1]) {
          this.links[0].focus();
        } else {
          this.links[this.getActiveItemIndex() + 1].focus();
        }
        break;

      // focus first item
      case KEYCODES.KEY_HOME:
        this.links[0].focus();
        break;
      
      // focus last item
      case KEYCODES.KEY_END:
        this.links[this.links.length - 1].focus();
        break;
    }
  }

}
