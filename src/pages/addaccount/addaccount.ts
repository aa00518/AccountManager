import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Accounts } from '../../providers/accounts';
import { Transactions } from '../../providers/transactions';
import { CurrentAccount } from '../../providers/currentaccount';

@Component({
  selector: 'page-addaccount',
  templateUrl: 'addaccount.html'
})
export class AddAccountPage {
  @ViewChild('txtAccount') txtAccount;
  account: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public accountsPrvdr: Accounts, public toastCtrl: ToastController,
              public transactionsPrvdr: Transactions, public currentaccountPrvdr: CurrentAccount) {
  }

  presentToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: "top"
    });
    toast.present();
  }

  ionViewDidEnter() {
    setTimeout(() => {
      this.txtAccount.setFocus();
    }, 500);
  }

  addAccount() {
    if (this.account != null) {
      if (this.account.trim() == "") {
        this.presentToast("Please enter an Account.");
        this.account = null;
        setTimeout(() => {
          this.txtAccount.setFocus();
        }, 500);
        return;
      }
    } else {
      this.presentToast("Please enter an Account.");
      this.account = null;
        setTimeout(() => {
          this.txtAccount.setFocus();
        }, 500);
      return;
    }

    this.accountsPrvdr.addAccount(this.account.trim());
    this.currentaccountPrvdr.setCurrentAccount(this.account.trim());
    this.presentToast("Account " + this.account.trim() + " added.");
    this.transactionsPrvdr.getTransactions(this.currentaccountPrvdr.getCurrentAccount());

    this.account = null;
    this.navCtrl.pop();
  }
}
