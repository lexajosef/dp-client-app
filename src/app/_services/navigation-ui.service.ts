import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavigationUIService {

  private asideNavVisible: boolean = true;

  constructor() { }

  getAsideNavVisible(): boolean {
    return this.asideNavVisible;
  }

  setAsideNavVisible(value: boolean) {
    this.asideNavVisible = value;
  }

  toggleAsideNavVisible() {
    this.asideNavVisible = !this.asideNavVisible;
  }
}
