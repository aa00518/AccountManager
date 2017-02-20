import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { EditTransactionPage } from '../../pages/edittransaction/edittransaction';
import { Auth } from '../../providers/auth';
import { Accounts } from '../../providers/accounts';

@Component({
  selector: 'page-transactions',
  templateUrl: 'transactions.html'
})
export class TransactionsPage {
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;
  accountName: string;
  loader: any;

  constructor(public navCtrl: NavController, public params: NavParams, public auth: Auth, public loadingCtrl: LoadingController, public accountsPrvdr: Accounts) {
    if (!this.auth.loggedIn) {
      this.doLogin();
    }

    if (this.params.get("accountName") != null) {
      this.accountName = this.params.get("accountName");
    }
    
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane', 'american-football', 'boat', 'bluetooth', 'build'];
    this.items = [];
    for (let i = 1; i < 11; i++) {
      this.items.push({
        title: 'Item ' + i,
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }
  }

  onViewWillEnter() {
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

  addAccount() {
    this.accountsPrvdr.addAccount("Starbucks Gift Card");
  }

  doLogin() {
    this.presentLoading();
    this.auth.doLogin().then((isLoggedIn) => {
      if(isLoggedIn) {
        this.accountsPrvdr.getAccounts();
        this.accountName = this.accountsPrvdr.accounts[0].accountName;
      }
      this.loader.dismiss();
    });
  }
}
