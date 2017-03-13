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
    this.auth.af.database.list('/Accounts/' + this.auth.userProfile.uid, {
      query: {
        orderByChild: 'addedDate'
      }
    }).subscribe(value => {
        //this.accounts = value.reverse();
        this.accounts = value;
      },
      (error) => {},
      () => {});
  }

  addAccount(accountName: string) {
    this.auth.af.database.list('/Accounts/' + this.auth.userProfile.uid).push({
      //userID: this.auth.userProfile.uid,
      accountName: accountName,
      //activity: accountName,
      //amount: 0,
      addedDate: Date.now()
    });
  }

  deleteAccount(accountName: string) {
    const accountsList = this.auth.af.database.list('/Accounts/' + this.auth.userProfile.uid);
    accountsList.remove('SOME_KEY');
  }
}
