import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { NavigationUIService } from '../_services/navigation-ui.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  @ViewChild('drawer') drawer: ElementRef;

  constructor(private navigationUIService: NavigationUIService) {
    if (window.innerWidth >= this.navigationUIService.widthLimit) {
      // open drawer on desktop in default
      this.navigationUIService.setAsideNavVisible(true);
    }
  }

  ngOnInit() {
    
  }

  get drawerEl() { return this.drawer.nativeElement } // TODO: need this element ref???

  menuBtnClick() {
    if (window.innerWidth < this.navigationUIService.widthLimit) {
      if (this.navigationUIService.getAsideNavVisible()) {
        document.body.classList.remove('drawer-scroll-lock');
      } else {
        document.body.classList.add('drawer-scroll-lock');
      }
    }
    
    this.navigationUIService.toggleAsideNavVisible();
  }

  drawerClick(event: any) {
    if (event.target === this.drawerEl) {
      this.navigationUIService.setAsideNavVisible(false);
      document.body.classList.remove('drawer-scroll-lock');
    }
  }
}
