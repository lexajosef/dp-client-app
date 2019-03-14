import { Component, Input, ViewChild, TemplateRef, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ui-menu-item',
  template: `
    <ng-template>
      <ng-content></ng-content>
    </ng-template>
  `
})
export class MenuItemComponent {
  
  @Input() href: string;
  @Input() label: string;

  @Output() click = new EventEmitter<any>();

  @ViewChild(TemplateRef) template: TemplateRef<any>; 

  onLinkClick() {
    this.click.emit();
  }
}
