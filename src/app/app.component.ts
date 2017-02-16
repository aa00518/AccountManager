import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { TransactionsPage } from '../pages/transactions/transactions';
import { SettingsPage } from '../pages/settings/settings';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = TransactionsPage;
  accounts: Array<{accountName: string}>;
  currentAccount: string;

  constructor(public platform: Platform) {
    this.initializeApp();

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

      this.openPage(this.currentAccount, true);
    });
  }

  openPage(accountName: string, doAuth: boolean) {
    this.currentAccount = accountName.trim();
    this.nav.setRoot(this.rootPage, { accountName: this.currentAccount, doAuth: doAuth });
  }

  getCurrentAccount() {
    return this.currentAccount.trim();
  }

  openSettingsPage() {
    this.nav.push(SettingsPage);
  }
}

// Array
// pages: Array<{title: string, component: any}>;

// this.pages = [
//   { title: 'Page One', component: Page1 },
//   { title: 'Page Two', component: Page2 }
// ];
