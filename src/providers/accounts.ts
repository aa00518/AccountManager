import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Auth } from '../providers/auth';
import 'rxjs/add/operator/map';

type account = {
  $key: string;
  accountName: string;
  addedDate: string;
}

type currentAccount = {
  $key: string;
  currentAccountKey: string;
}

@Injectable()
export class Accounts {
  accounts: account[];
  currentAccount: currentAccount;

  constructor(public http: Http, public auth: Auth) {
    this.accounts = null;
    this.currentAccount = null;
  }

  getAccounts() {
    this.auth.af.database.list('/CurrentAccount/' + this.auth.userProfile.uid).subscribe(value => {
      this.currentAccount = value[0] as currentAccount;
      if (this.currentAccount == null)
      {
        this.addInitCurrentAccount("start");
      }
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
          this.addAccount("Checking");
          this.addInitAccount("Savings");
        }
      },
      (error) => {},
      () => {});
  }

  addInitCurrentAccount($currentAccountKey: string) {
    this.auth.af.database.list('/CurrentAccount/' + this.auth.userProfile.uid).push({
      currentAccountKey: $currentAccountKey
    });
  }

  addInitAccount(accountName: string) {
    this.auth.af.database.list('/Accounts/' + this.auth.userProfile.uid).push({
      accountName: accountName,
      addedDate: Date.now()
    });
  }  

  addAccount(accountName: string) {
    this.auth.af.database.list('/Accounts/' + this.auth.userProfile.uid).push({
      accountName: accountName,
      addedDate: Date.now()
    });
    this.setCurrentAccount(this.accounts[this.accounts.length - 1]);
  }

  deleteAccount($key: string) {
    const accountsList = this.auth.af.database.list('/Accounts/' + this.auth.userProfile.uid);
    accountsList.remove($key);
    this.setCurrentAccount(this.accounts[0]);
  }

  setCurrentAccount(account: account) {
    const currentAccountList = this.auth.af.database.list('/CurrentAccount/' + this.auth.userProfile.uid);
    currentAccountList.update(this.currentAccount.$key, { currentAccountKey: account.$key });
  }

  // getCurrentAccount() {
  //   this.auth.af.database.list('/CurrentAccount/' + this.auth.userProfile.uid).subscribe(value => {
  //     this.currentAccount = value[0] as currentAccount;
  //   });
    
  //   if (this.currentAccount == null) {
  //     this.auth.af.database.list('/CurrentAccount/' + this.auth.userProfile.uid).push({
  //       currentAccountKey: this.accounts[0].key
  //     });
  //   }

  //   return this.currentAccount;
  // }
}
