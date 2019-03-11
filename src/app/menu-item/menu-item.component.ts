import { Component, Input, ViewChild, TemplateRef } from '@angular/core';

@Component({
  selector: 'ui-menu-item',
  styleUrls: ['./menu-item.component.css'],
  template: `
    <ng-template>
      <ng-content></ng-content>
    </ng-template>
  `
})
export class MenuItemComponent {
  
  @Input() href: string;
  @Input() label: string;
  @ViewChild(TemplateRef) template: TemplateRef<any>; 

}
