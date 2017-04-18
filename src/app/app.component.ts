import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TransactionsPage } from '../pages/transactions/transactions';
import { SettingsPage } from '../pages/settings/settings';
import { AddAccountPage } from '../pages/addaccount/addaccount';
import { Accounts } from '../providers/accounts';
import { Auth } from '../providers/auth';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any;

  constructor(public platform: Platform, public accountsPrvdr: Accounts, public auth: Auth, private statusBar: StatusBar, private splashScreen: SplashScreen) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.openPage(null);
    });
  }

  openPage(account: any) {
    if (account != null) {
      this.accountsPrvdr.setCurrentAccount(account);
    }
    this.nav.setRoot(TransactionsPage, { account: account });
  }

  openSettingsPage() {
    this.nav.push(SettingsPage);
  }

  openAddAccountPage() {
    this.nav.push(AddAccountPage, { pageType: 'add' });
  }
}
