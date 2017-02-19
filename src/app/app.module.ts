import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { TransactionsPage } from '../pages/transactions/transactions';
import { EditTransactionPage } from '../pages/edittransaction/edittransaction';
import { SettingsPage } from '../pages/settings/settings';
import { Auth } from '../providers/auth';
import { Accounts } from '../providers/accounts';

@NgModule({
  declarations: [
    MyApp,
    TransactionsPage,
    EditTransactionPage,
    SettingsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TransactionsPage,
    EditTransactionPage,
    SettingsPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, Auth, Accounts]
})
export class AppModule {}
