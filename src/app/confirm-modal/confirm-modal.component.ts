import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

import { ConfirmModalService } from '../_services/confirm-modal.service';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent implements OnInit {
  
  @ViewChild('dialog') dialog: ElementRef;
  @ViewChild('cancelBtn') cancelBtn: ElementRef;
  @ViewChild('confirmBtn') confirmBtn: ElementRef;

  title: string;
  message: string;
  confirmBtnText: string;
  cancelBtnText: string;

  constructor(private confirmModalService: ConfirmModalService) {
    confirmModalService.activate = this.activate.bind(this);
  }

  ngOnInit() {
  }
  
  get dialogElement() { return this.dialog.nativeElement }
  get cancelBtnElement() { return this.cancelBtn.nativeElement }
  get confirmBtnElement() { return this.confirmBtn.nativeElement }

  activate(title: string, message: string, confirmBtnText: string, cancelBtnText: string): Promise<boolean> {
    this.title = title;
    this.message = message;
    this.confirmBtnText = confirmBtnText;
    this.cancelBtnText = cancelBtnText;

    return new Promise<boolean>(resolve => {
      this.showConfirmModal(resolve);
    });
  }

  private showModal() {
    this.confirmModalService.setConfirmVisible(true);
    this.dialogElement.classList.add('opened');
  }

  private hideModal() {
    this.confirmModalService.setConfirmVisible(false);
    this.dialogElement.classList.remove('opened');
  }

  private showConfirmModal(resolve: any) {
    this.showModal();

    // listen to cancel dialog
    this.cancelBtn.nativeElement.addEventListener('click', () => {
      this.hideModal();
      resolve(false);
    });

    // listen to confirm dialog
    this.confirmBtn.nativeElement.addEventListener('click', () => {
      this.hideModal();
      resolve(true);
    });
  }

}
