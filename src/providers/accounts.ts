import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Auth } from '../providers/auth';
import { Transactions } from '../providers/transactions';
import 'rxjs/add/operator/map';

type account = {
  $key: string;
  accountName: string;
  addedDate: string;
}

// type currentAccountKey = {
//   $key: string;
//   currentAccountKey: string;
// }

@Injectable()
export class Accounts {
  accounts: account[];
  currentAccountKey: string;

  constructor(public http: Http, public auth: Auth, public transactionsPrvdr: Transactions) {
    this.accounts = null;
    this.currentAccountKey = null;
  }

  getAccounts() {
    this.auth.af.database.object('/CurrentAccount/' + this.auth.userProfile.uid).subscribe(value => {
      this.currentAccountKey = value.currentAccountKey;
    },
    (error) => {},
    () => {});

    this.auth.af.database.list('/Accounts/' + this.auth.userProfile.uid, {
      query: {
        orderByChild: 'addedDate'
      }
    }).subscribe(value => {
        this.accounts = value as account[];
        if (this.accounts.length == 0) {
          this.initDB();
        } else {
          this.transactionsPrvdr.getTransactions(this.currentAccountKey);
        }
      },
      (error) => {},
      () => {});
  }

  initCurrentAccount(currentAccountKey: string) {
    this.auth.af.database.object('/CurrentAccount/' + this.auth.userProfile.uid).set({
      currentAccountKey: currentAccountKey
    });
  }

  setCurrentAccount(account: account) {
    const currentAccountObject = this.auth.af.database.object('/CurrentAccount/' + this.auth.userProfile.uid);
    currentAccountObject.update({ currentAccountKey: account.$key });
  }

  getCurrentAccount() {
    return this.accounts.find(item => item.$key == this.currentAccountKey);
  }

  initDB() {
    this.auth.af.database.list('/Accounts/' + this.auth.userProfile.uid).push({
      accountName: "Checking",
      addedDate: Date.now()
    }).then(() => {
      this.initCurrentAccount(this.accounts[0].$key);
    }).then(() => {
      this.auth.af.database.list('/Accounts/' + this.auth.userProfile.uid).push({
        accountName: "Savings",
        addedDate: Date.now()
      });
    });
  }

  addAccount(accountName: string) {
    this.auth.af.database.list('/Accounts/' + this.auth.userProfile.uid).push({
      accountName: accountName,
      addedDate: Date.now()
    }).then(() => {
      this.setCurrentAccount(this.accounts[this.accounts.length - 1]);
    });
  }

  deleteAccount() {
    const accountsList = this.auth.af.database.list('/Accounts/' + this.auth.userProfile.uid);
    accountsList.remove(this.currentAccountKey).then(() => {
      this.setCurrentAccount(this.accounts[0]);
    });
  }

  updateAccount(accountName: string) {
    const accountsList = this.auth.af.database.list('/Accounts/' + this.auth.userProfile.uid);
    accountsList.update(this.currentAccountKey, { accountName: accountName });
  }
}
