import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, PopoverController } from 'ionic-angular';
import { EditTransactionPage } from '../../pages/edittransaction/edittransaction';
import { TransactionsPopoverMenuPage } from '../../pages/transactions-popover-menu-page/transactions-popover-menu-page';
import { Auth } from '../../providers/auth';
import { Accounts } from '../../providers/accounts';
import { Transactions } from '../../providers/transactions';

@Component({
  selector: 'page-transactions',
  templateUrl: 'transactions.html'
})
export class TransactionsPage {
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;
  loader: any;

  constructor(public navCtrl: NavController, public params: NavParams, public auth: Auth, public loadingCtrl: LoadingController,
              public accountsPrvdr: Accounts, public transactionsPrvdr: Transactions, public popoverCtrl: PopoverController) {
    if (!this.auth.loggedIn) {
      this.doSilentLogin();
    }

    if (this.params.get("account") != null) {
      this.transactionsPrvdr.getTransactions(this.accountsPrvdr.currentAccountKey);
    }
    
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane', 'american-football', 'boat', 'bluetooth', 'build'];
    this.items = [];
    for (let i = 1; i < 16; i++) {
      this.items.push({
        title: 'Item ' + i,
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }
  }

  addTransaction() {
    this.navCtrl.push(EditTransactionPage, { item: null });
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(TransactionsPopoverMenuPage);
    popover.present({
      ev: myEvent
    });
  }

  itemTapped(event, item) {
    this.navCtrl.push(EditTransactionPage, { item: item });
  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Authenticating..."
    });
    this.loader.present();
  }

  dismissLoading() {
    this.loader.dismiss().catch(() => {});
  }

  doSilentLogin() {
    this.presentLoading();
    this.auth.af.auth.subscribe(res => {
      if(res) {
        this.auth.userProfile = res.auth as any;
        this.auth.loggedIn = true;
        this.accountsPrvdr.getAccounts();
        //this.transactionsPrvdr.getTransactions(this.accountsPrvdr.currentAccountKey);
      }
      else {
      }
      this.dismissLoading();
    });
  }

  doLogin() {
    this.presentLoading();
    this.auth.doLogin().then(() => {
      this.accountsPrvdr.getAccounts();
      //this.transactionsPrvdr.getTransactions(this.accountsPrvdr.currentAccountKey);
      this.dismissLoading();
    }).catch(error => {
      this.dismissLoading();
    });
  }
}
