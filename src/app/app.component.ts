import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { Transactions } from '../pages/transactions/transactions';
//import { EditTransaction } from '../pages/edittransaction/edittransaction';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = Transactions;
  //pages: Array<{title: string, component: any}>;
  accounts: Array<{accountName: string}>;
  currentAccount: string;

  constructor(public platform: Platform) {
    this.initializeApp();

    // this.pages = [
    //   { title: 'Page One', component: Page1 },
    //   { title: 'Page Two', component: Page2 }
    // ];

    this.accounts = [
      { accountName: 'Checking' },
      { accountName: 'Savings' }
    ];

    this.currentAccount = this.accounts[0].accountName.trim();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();

      this.currentAccount = this.getCurrentAccount();

      this.openPage(this.currentAccount);
    });
  }

  openPage(accountName) {
    this.currentAccount = accountName.trim();
    this.nav.setRoot(this.rootPage, { accountName: this.currentAccount });
  }

  getCurrentAccount() {
    return this.currentAccount.trim();
  }
}
