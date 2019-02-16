import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { NavigationUIService } from '../_services/navigation-ui.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  @ViewChild('drawer') drawer: ElementRef;

  constructor(private navigationUIService: NavigationUIService) { }

  ngOnInit() {
    
  }

  get drawerEl() { return this.drawer.nativeElement }

  menuBtnClick() {
    if (this.navigationUIService.getAsideNavVisible()) {
      
    } else {

    }
    this.navigationUIService.toggleAsideNavVisible();
  }

}
