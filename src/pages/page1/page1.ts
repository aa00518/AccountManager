import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html'
})
export class Page1 {

  accountName: string;

  constructor(public navCtrl: NavController, public params: NavParams) {
    this.accountName = params.get("accountName");
  }

  onViewWillEnter() {

  }
}
