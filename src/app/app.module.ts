import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { GooglePlus } from '@ionic-native/google-plus';
import { MyApp } from './app.component';
import { TransactionsPage } from '../pages/transactions/transactions';
import { EditTransactionPage } from '../pages/edittransaction/edittransaction';
import { SettingsPage } from '../pages/settings/settings';
import { AddAccountPage } from '../pages/addaccount/addaccount';
import { TransactionsPopoverMenuPage } from '../pages/transactions-popover-menu-page/transactions-popover-menu-page';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import { Auth } from '../providers/auth';
import { Accounts } from '../providers/accounts';
import { Transactions } from '../providers/transactions';

export const firebaseConfig = {
  apiKey: "AIzaSyC18FXK353nkslSfU2fkMp2_XKIGQ1APsQ",
  authDomain: "acctmgrfire.firebaseapp.com",
  databaseURL: "https://acctmgrfire.firebaseio.com",
  storageBucket: "acctmgrfire.appspot.com",
  messagingSenderId: "658095225206"
};

export const firebaseAuthConfig = {
  provider: AuthProviders.Google,
  method: AuthMethods.Popup,
  remember: 'default',
  scope: ['email']
}

@NgModule({
  declarations: [
    MyApp,
    TransactionsPage,
    EditTransactionPage,
    SettingsPage,
    AddAccountPage,
    TransactionsPopoverMenuPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TransactionsPage,
    EditTransactionPage,
    SettingsPage,
    AddAccountPage,
    TransactionsPopoverMenuPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, Auth, Accounts, Transactions, StatusBar, SplashScreen, GooglePlus]
})
export class AppModule {}
