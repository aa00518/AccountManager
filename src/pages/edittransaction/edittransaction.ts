import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Accounts } from '../../providers/accounts';
import { Transactions } from '../../providers/transactions';

@Component({
  selector: 'page-edittransaction',
  templateUrl: 'edittransaction.html'
})
export class EditTransactionPage {
  
  @ViewChild('txtAccount') txtAccount;
  
  account: string;
  activity: string;
  amount: number;
  date: string;
  
  selectedItem: any;
  
  pageUsage: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, public accountsPrvdr: Accounts,
              public transactionsPrvdr: Transactions) {
    
    this.selectedItem = navParams.get('item');
    
    if (this.selectedItem == null) {
      this.pageUsage = "Add Transaction";
    } else {
      this.pageUsage = "Edit Transaction";
    }
  }

  ionViewDidEnter() {
    setTimeout(() => {
      this.txtAccount.setFocus();
    }, 500);
  }

  presentToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: "top"
    });
    toast.present();
  }

  doTransaction() {
    this.transactionsPrvdr.addTransaction(this.accountsPrvdr.currentAccountKey, this.activity);
    this.presentToast(this.pageUsage + ' completed successfully.');
    this.navCtrl.pop();
  }
}
