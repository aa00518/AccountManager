import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { TransactionsPage } from '../pages/transactions/transactions';
import { SettingsPage } from '../pages/settings/settings';
import { AddAccountPage } from '../pages/addaccount/addaccount';
import { Accounts } from '../providers/accounts';
import { CurrentAccount } from '../providers/currentaccount';
import { Auth } from '../providers/auth';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any;

  constructor(public platform: Platform, public accountsPrvdr: Accounts, public auth: Auth, public currentaccountPrvdr: CurrentAccount) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();
      this.openPage(null);
    });
  }

  openPage(accountName: string) {
    if (accountName != null) {
      this.currentaccountPrvdr.setCurrentAccount(accountName);
    }
    this.nav.setRoot(TransactionsPage, { accountName: accountName });
  }

  openSettingsPage() {
    this.nav.push(SettingsPage);
  }

  openAddAccountPage() {
    this.nav.push(AddAccountPage);
  }
}
