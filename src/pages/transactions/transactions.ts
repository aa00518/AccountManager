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
  loggedIn: boolean = false;
  loader: any;

  constructor(public navCtrl: NavController, public params: NavParams, public auth: Auth, public loadingCtrl: LoadingController, public accountsPrvdr: Accounts) {
    this.loggedIn = false;
    if (this.params.get("doAuth")) {
      this.presentLoading();
      this.auth.doLogin().then((isLoggedIn) => {
        if(isLoggedIn) {
          this.loggedIn = true;
          // Now need to access the app object to turn on accounts list, settings button, etc...
          // If we can successfully do the above, then we need to init app object with that stuff turned off.
          // Can use two different menus, one for authenticated and one for not
          // Need to create an Accounts provider bound to the menu list in app.html
          // And should be able to manipulate that Accounts provider from here and it should automatically update the menu???
          this.accountsPrvdr.getAccounts();
          this.accountName = this.accountsPrvdr.accounts[0].accountName;
        } else {
          this.loggedIn = false;
        }
        this.loader.dismiss();
      });
    } else {
      this.loggedIn = true;
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
}
