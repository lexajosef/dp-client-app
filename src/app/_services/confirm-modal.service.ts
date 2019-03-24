import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfirmModalService {

  private isConfirmVisible: boolean = false;

  activate: (title: string, message: string, confirmBtnText: string, cancelBtnText: string) 
      => Promise<boolean>;

  getConfirmVisible(): boolean {
    return this.isConfirmVisible;
  }

  setConfirmVisible(value: boolean) {
    this.isConfirmVisible = value;
  }

}
