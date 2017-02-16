import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { EditTransactionPage } from '../../pages/edittransaction/edittransaction';
import { Auth } from '../../providers/auth';

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

  constructor(public navCtrl: NavController, public params: NavParams, public auth: Auth, public loadingCtrl: LoadingController) {
    this.loggedIn = false;
    if (params.get("doAuth")) {
      this.presentLoading();
      this.auth.doLogin().then((isLoggedIn) => {
        if(isLoggedIn) {
          this.loggedIn = true;
          // Now need to access the app object to turn on accounts list, settings button, etc...
          // If we can successfully do the above, then we need to init app object with that stuff turned off.
        } else {
          this.loggedIn = false;
        }
        this.loader.dismiss();
      });
    } else {
      this.loggedIn = true;
    }

    this.accountName = params.get("accountName");
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
}
