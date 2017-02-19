import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { TransactionsPage } from '../pages/transactions/transactions';
import { SettingsPage } from '../pages/settings/settings';
import { Accounts } from '../providers/accounts';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any;
  //currentAccount: string;

  constructor(public platform: Platform, public accountsPrvdr: Accounts) {
    this.initializeApp();
    //this.currentAccount = this.accounts[0].accountName.trim();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();
      //this.currentAccount = this.getCurrentAccount();
      //this.openPage(this.currentAccount, true);
      this.openPage(null, true);
    });
  }

  openPage(accountName: string, doAuth: boolean) {
    //this.currentAccount = accountName.trim();
    this.nav.setRoot(TransactionsPage, { accountName: accountName, doAuth: doAuth });
  }

  // getCurrentAccount() {
  //   return this.currentAccount.trim();
  // }

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
