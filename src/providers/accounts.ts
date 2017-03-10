import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Auth } from '../providers/auth';
import 'rxjs/add/operator/map';

@Injectable()
export class Accounts {
  accounts: any;

  constructor(public http: Http, public auth: Auth) {
    this.accounts = null;
  }

  getAccounts() {
    this.auth.af.database.list('/Transactions/' + this.auth.userProfile.uid, {
    }).subscribe(value => {
        this.accounts = value;
      },
      (error) => {},
      () => {});
  }

  addAccount(accountName: string) {
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
