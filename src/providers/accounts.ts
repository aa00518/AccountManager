import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Auth } from '../providers/auth';
import 'rxjs/add/operator/map';

@Injectable()
export class Accounts {
  //accounts: Array<{accountName: string}>;
  accounts: any;
  transactions: any;
  currentAccount: string;

  constructor(public http: Http, public auth: Auth) {
    this.accounts = null;
    this.transactions = null;
    this.currentAccount = 'Checking';
  }

  getAccounts() {
    // this.accounts = [
    //   { accountName: 'Checking' },
    //   { accountName: 'Savings' }
    // ];

    //this.auth.af.database.list('/Transactions/' + this.auth.userProfile.uid + '/' + this.currentAccount, {
      this.auth.af.database.list('/Transactions/' + this.auth.userProfile.uid, {
      // query: {
      //   orderByChild: 'transactionDate',
      //   limitToFirst: 10
      // }
    }).subscribe(value => {
      //this.accounts = value.reverse();
      this.accounts = value;
      //this.currentAccount = this.accounts[0].$key;
      },
      (error) => {},
      () => {});
  }

  getTransactions() {
    this.auth.af.database.list('/Transactions/' + this.auth.userProfile.uid + '/' + this.currentAccount, {
      query: {
        orderByChild: 'transactionDate',
        limitToFirst: 10
      }
    }).subscribe(value => {
        this.transactions = value.reverse();
      },
      (error) => {},
      () => {});
  }

  addAccount(accountName: string) {
    // let counter: number = this.accounts.length;
    // this.accounts.push({ accountName: accountName + ' ' + counter.toString() });
    // return accountName + ' ' + counter.toString();
  }
}
