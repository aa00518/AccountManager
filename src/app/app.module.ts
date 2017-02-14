import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Transactions } from '../pages/transactions/transactions';
import { EditTransaction } from '../pages/edittransaction/edittransaction';

@NgModule({
  declarations: [
    MyApp,
    Transactions,
    EditTransaction
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Transactions,
    EditTransaction
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
