import { Component, OnInit } from '@angular/core';

import { AuthService } from './_services/auth.service';
import { NavigationUIService } from './_services/navigation-ui.service';
import { ConfirmModalService } from './_services/confirm-modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private navigationUIService: NavigationUIService,
    private confirmModalService: ConfirmModalService
  ) { }

  ngOnInit() { }

  setDrawerCloseClass(): boolean {
    return (!this.navigationUIService.getAsideNavVisible() 
        && (window.innerWidth >= this.navigationUIService.widthLimit));
  }

  setMainContainerClass(): void {
    console.log('To set class from navigation component');
  }

  isUserLoggedIn(): boolean {
    return this.authService.isUserLoggedIn();
  }

  markMainAsInert(): boolean {
    return this.navigationUIService.getAsideNavVisible() && window.innerWidth < this.navigationUIService.widthLimit;
  }

  isConfirmVisible(): boolean {
    return this.confirmModalService.getConfirmVisible();
  }

}
