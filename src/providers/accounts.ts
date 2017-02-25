import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class Accounts {

  accounts: Array<{accountName: string}>;

  constructor(public http: Http) {
    this.accounts = null;
  }

  getAccounts() {
    this.accounts = [
      { accountName: 'Checking' },
      { accountName: 'Savings' }
    ];
  }

  addAccount(accountName: string) {
    let counter: number = this.accounts.length;
    this.accounts.push({ accountName: accountName + ' ' + counter.toString() });
    return accountName + ' ' + counter.toString();
  }
}
