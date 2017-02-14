import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = Page1;
  pages: Array<{title: string, component: any}>;
  accounts: Array<{accountName: string}>;

  constructor(public platform: Platform) {
    this.initializeApp();

    this.pages = [
      { title: 'Page One', component: Page1 },
      { title: 'Page Two', component: Page2 }
    ];

    this.accounts = [
      { accountName: 'Checking' },
      { accountName: 'Savings' }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(account) {
    this.nav.setRoot(this.rootPage, { accountName: account.accountName });
  }
}
