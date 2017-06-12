import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Accounts } from '../../providers/accounts';
import { Transactions } from '../../providers/transactions';

@Component({
  selector: 'page-addaccount',
  templateUrl: 'addaccount.html'
})
export class AddAccountPage {
  @ViewChild('txtAccount') txtAccount;
  account: string;
  pageUsage: string;
  oldAccountName: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public accountsPrvdr: Accounts, public toastCtrl: ToastController,
              public transactionsPrvdr: Transactions) {
    if (this.navParams.get("pageType") == "add") {
      this.pageUsage = "Add Account";
    } else {
      this.pageUsage = "Change Account Name";
      //this.oldAccountName = this.accountsPrvdr.getCurrentAccount().accountName;
      this.account = this.oldAccountName;
    }
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

    if (this.navParams.get("pageType") == "add") {
      this.accountsPrvdr.addAccount(this.account.trim());
      this.presentToast("Account " + this.account.trim() + " added.");
    } else {
      this.accountsPrvdr.updateAccount(this.account.trim());
      this.presentToast("Account " + this.oldAccountName + " changed to " + this.account.trim() + ".");
    }
    
    this.transactionsPrvdr.getTransactions(this.accountsPrvdr.currentAccountKey);

    this.account = null;
    this.navCtrl.pop();
  }
}
