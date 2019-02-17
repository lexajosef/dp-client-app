import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavigationUIService {

  private asideNavVisible: boolean = false;
  widthLimit: number = 900;

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
