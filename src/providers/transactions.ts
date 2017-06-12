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

  getTransactions(currentAccountKey: string) {
    // this.auth.af.database.list('/Transactions/' + this.auth.userProfile.uid + '/' + currentAccountKey//, {
    // ).subscribe(value => {
    //   this.transactions = value.sort((t1, t2) => t2.transactionDate - t1.transactionDate);
    // },
    // (error) => {},
    // () => {});
  }

  addTransaction(currentAccountKey: string, activity: string) {
  //   this.auth.af.database.list('/Transactions/' + this.auth.userProfile.uid + '/' + currentAccountKey).push({
  //     userID: this.auth.userProfile.uid,
  //     currentAccountKey: currentAccountKey,
  //     activity: activity,
  //     amount: 46.20,
  //     transactionDate: Date.now()
  //   });
  }
}
