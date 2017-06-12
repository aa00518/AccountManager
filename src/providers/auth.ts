import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Platform } from 'ionic-angular';
import { AngularFire, FirebaseAuthState, AuthProviders } from 'angularfire2';
import { GooglePlus } from 'ionic-native';
import firebase from 'firebase';
import 'rxjs/add/operator/map';

@Injectable()
export class Auth {
  loggedIn: boolean;
  userProfile: FirebaseAuthState = null;

  constructor(public http: Http, public af: AngularFire, public platform: Platform) {
    this.loggedIn = false;
    this.userProfile = null;
  }

  doLogin() {
    if (this.platform.is('android')) {
      return this.googlePlusLogin();
    }
    else {
      return this.fireBaseLogin();
    }
  }

  // doSilentLogin() {
  //   this.af.auth.subscribe(res => {
  //     if(res) {
  //       this.userProfile = res.auth as any;
  //       this.loggedIn = true;
  //     }
  //     else {
  //     }
  //   });
  // }

  googlePlusLogin() {
    return GooglePlus.login({ 'webClientId' : '658095225206-i1amh87tv7mfjunlk4ifqb3ne2dc2mhr.apps.googleusercontent.com' }).then((userData) => {
      var provider = firebase.auth.GoogleAuthProvider.credential(userData.idToken);
      firebase.auth().signInWithCredential(provider).then((success) => {
        this.userProfile = success;
        this.loggedIn = true;
      }).catch((error) => {
      });
    }).catch((error) => {
    });
  }

  fireBaseLogin() {
    return this.af.auth.login({ provider: AuthProviders.Google }).then(a => {
      this.userProfile = a.auth as any;
      this.loggedIn = true;
    }).catch(error => {
    });
  }

  doLogout() {
    this.af.auth.logout().then(reason => {}).catch(error => {});
    this.loggedIn = false;
    this.userProfile = null;
  }

  // doLogin() {
  //   return new Promise((resolve) => {
  //     setTimeout(() => {
  //       this.loggedIn = true;
  //       resolve(this.loggedIn);
  //     }, 1000);
  //   });
  // }

  // doLogout() {
  //   this.loggedIn = false;
  // }
}
