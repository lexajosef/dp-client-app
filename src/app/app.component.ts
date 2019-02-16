import { Component, OnInit, ViewChild } from '@angular/core';

import { AuthService } from './_services/auth.service';
import { NavigationUIService } from './_services/navigation-ui.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private navigationUIService: NavigationUIService
  ) { }

  ngOnInit() { }

  setMainContainerClass(): void {
    console.log('To set class from navigation component');
  }

  isUserLoggedIn(): boolean {
    return this.authService.isUserLoggedIn();
  }
}
