import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-addaccount',
  templateUrl: 'addaccount.html'
})
export class AddAccountPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  addAccount() {
    this.navCtrl.pop();
  }
}
