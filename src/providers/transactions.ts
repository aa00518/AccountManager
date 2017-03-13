import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Auth } from '../providers/auth';
import 'rxjs/add/operator/map';

@Injectable()
export class Transactions {
  transactions: any;

  constructor(public http: Http, public auth: Auth) {
    this.transactions = null;
  }

  getTransactions(currentAccount: string) {
    this.auth.af.database.list('/Transactions/' + this.auth.userProfile.uid + '/' + currentAccount, {
      query: {
        orderByChild: 'transactionDate'//,
        //limitToFirst: 10
      }
    }).subscribe(value => {
        this.transactions = value.reverse();
      },
      (error) => {},
      () => {});
  }

  addTransaction(accountName: string) {
    //this.auth.af.database.list('/Transactions/' + this.auth.userProfile.uid).push({ accountName: accountName });
    this.auth.af.database.list('/Transactions/' + this.auth.userProfile.uid + '/' + accountName).push({
      userID: this.auth.userProfile.uid,
      accountName: accountName,
      activity: accountName,
      amount: 0,
      transactionDate: Date.now()
    });
  }
}
