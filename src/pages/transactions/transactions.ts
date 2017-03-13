import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { EditTransactionPage } from '../../pages/edittransaction/edittransaction';
import { Auth } from '../../providers/auth';
import { Accounts } from '../../providers/accounts';
import { Transactions } from '../../providers/transactions';
import { CurrentAccount } from '../../providers/currentaccount';

@Component({
  selector: 'page-transactions',
  templateUrl: 'transactions.html'
})
export class TransactionsPage {
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;
  loader: any;

  constructor(public navCtrl: NavController, public params: NavParams, public auth: Auth, public loadingCtrl: LoadingController,
              public accountsPrvdr: Accounts, public transactionsPrvdr: Transactions, public currentaccountPrvdr: CurrentAccount) {
    if (!this.auth.loggedIn) {
      this.doSilentLogin();
    }

    if (this.params.get("accountName") != null) {
      this.transactionsPrvdr.getTransactions(this.currentaccountPrvdr.getCurrentAccount());
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

  deleteAccount() {
    this.accountsPrvdr.deleteAccount(this.currentaccountPrvdr.getCurrentAccount());
  }

  itemTapped(event, item) {
    this.navCtrl.push(EditTransactionPage, {
      item: item
    });
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
        this.transactionsPrvdr.getTransactions(this.currentaccountPrvdr.getCurrentAccount());
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
      this.transactionsPrvdr.getTransactions(this.currentaccountPrvdr.getCurrentAccount());
      this.dismissLoading();
    }).catch(error => {
      this.dismissLoading();
    });
  }
}
