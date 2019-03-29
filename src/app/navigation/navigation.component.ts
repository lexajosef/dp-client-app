import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as KEYCODES from 'keycode-js';

import { AuthService } from '../_services/auth.service';
import { NavigationUIService } from '../_services/navigation-ui.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  @ViewChild('header') header: ElementRef;
  @ViewChild('drawer') drawer: ElementRef;
  @ViewChild('menuButton') menuButton: ElementRef;

  constructor(
    private navigationUIService: NavigationUIService,
    private authService: AuthService,
    private router: Router
  ) {
    if (window.innerWidth >= this.navigationUIService.widthLimit) {
      // open drawer on desktop in default
      this.navigationUIService.setAsideNavVisible(true);
    }
  }

  ngOnInit() {
    if (window.innerWidth < this.navigationUIService.widthLimit) {
      this.drawerEl.setAttribute('inert', '');
    }
  }

  get headerEl() { return this.header.nativeElement }
  get drawerEl() { return this.drawer.nativeElement }
  get menuButtonEl() { return this.menuButton.nativeElement }

  private setInertOnMenuClose() {
    this.headerEl.removeAttribute('inert');
    this.drawerEl.setAttribute('inert', '');
    // inert of main container is set through navigationUIService in app.component.html
  }

  private onMenuClose() {
    this.navigationUIService.setAsideNavVisible(false);
    this.setInertOnMenuClose();
  }

  menuBtnClick() {
    this.navigationUIService.toggleAsideNavVisible();

    if (window.innerWidth < this.navigationUIService.widthLimit) {
      if (!this.navigationUIService.getAsideNavVisible()) {
        document.body.classList.remove('drawer-scroll-lock');
      } else {
        document.body.classList.add('drawer-scroll-lock');
        this.headerEl.setAttribute('inert', '');
        this.drawerEl.removeAttribute('inert');
        // inert to main container is set through navigationUIService in app.component.html

        this.drawerEl.querySelector('a').focus();
      }
    }

    if (!this.navigationUIService.getAsideNavVisible()) {
      this.setInertOnMenuClose();
    } else {
      this.drawerEl.removeAttribute('inert');
    }
  }

  onDrawerClick(event: any) {
    if (event.target === this.drawerEl) {
      this.onMenuClose();
      document.body.classList.remove('drawer-scroll-lock');
    }
  }

  onDrawerKeyDown(event: any) {
    // close drawer on ESC key on smaller window width
    if (event.keyCode === KEYCODES.KEY_ESCAPE && window.innerWidth < this.navigationUIService.widthLimit) {
      this.onMenuClose();
      this.menuButtonEl.focus();
    }
  }

  // for closing navigation after link click on mobile devices
  routerLinkClick() {
    if (window.innerWidth < this.navigationUIService.widthLimit) {
      this.onMenuClose();
    }
  }

  onWindowResize() {
    if (window.innerWidth >= this.navigationUIService.widthLimit) {
      this.headerEl.removeAttribute('inert');
    } else if (this.navigationUIService.getAsideNavVisible()) {
      this.headerEl.setAttribute('inert', '');
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
