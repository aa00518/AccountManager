import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-transactions',
  templateUrl: 'transactions.html'
})
export class Transactions {

  accountName: string;

  constructor(public navCtrl: NavController, public params: NavParams) {
    this.accountName = params.get("accountName");
  }

  onViewWillEnter() {

  }
}
