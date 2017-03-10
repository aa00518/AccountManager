import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Auth } from '../providers/auth';
import 'rxjs/add/operator/map';

@Injectable()
export class CurrentAccount {
  currentAccount: string;

  constructor(public http: Http, public auth: Auth) {
    this.currentAccount = 'Checking';
  }

  setCurrentAccount(currentAccount: string) {
    this.currentAccount = currentAccount;
  }

  getCurrentAccount() {
    if (this.currentAccount == null)
    {
      this.currentAccount = 'Checking';
    }
    return this.currentAccount;
  }
}
