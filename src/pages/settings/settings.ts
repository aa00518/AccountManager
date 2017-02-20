import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Auth } from '../../providers/auth';
import { Accounts } from '../../providers/accounts';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public auth: Auth, public accountsPrvdr: Accounts, public toastCtrl: ToastController) {
  }

  doLogout() {
    this.auth.doLogout();
    this.accountsPrvdr.accounts = null;
    this.presentToast();
    this.navCtrl.pop();
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Logged out.',
      position: 'top',
      duration: 3000
    });
    toast.present();
  }
}
