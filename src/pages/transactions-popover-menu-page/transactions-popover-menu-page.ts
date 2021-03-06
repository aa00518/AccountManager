import { Component } from '@angular/core';
import { ViewController, AlertController, ToastController, App } from 'ionic-angular';
import { AddAccountPage } from '../addaccount/addaccount';
import { Accounts } from '../../providers/accounts';

@Component({
  template: `
    <ion-list>
      <button ion-item (click)="close()">Delete Cleared</button>
      <button ion-item (click)="changeAccountName()">Change Account Name</button>
      <button ion-item (click)="close()">Delete All Transactions</button>
      <button *ngIf="accountsPrvdr.accounts.length > 1" ion-item (click)="deleteAccount()">Delete Account</button>
    </ion-list>
  `
})
export class TransactionsPopoverMenuPage {
  accountName: string;

  constructor(public viewCtrl: ViewController, public accountsPrvdr: Accounts, public alertCtrl: AlertController, public toastCtrl: ToastController,
              public appCtrl: App) {
    this.accountName = this.accountsPrvdr.getCurrentAccount().accountName;
  }

  close() {
    this.viewCtrl.dismiss();
  }

  changeAccountName() {
    this.appCtrl.getRootNav().push(AddAccountPage, { pageType: 'update' });
    this.viewCtrl.dismiss();
  }

  deleteAccount() {
    let confirm = this.alertCtrl.create({
      title: 'Delete Account?',
      message: 'Are you sure you want to delete account ' + this.accountName + '?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.accountsPrvdr.deleteAccount();
            let toast = this.toastCtrl.create({
              message: 'Account ' + this.accountName + ' deleted.',
              duration: 3000,
              position: 'top'
            });
            toast.present();
          }
        },
        {
          text: 'No',
          handler: () => {
          }
        }
      ]
    });
    confirm.present();
    this.viewCtrl.dismiss();
  }
}
