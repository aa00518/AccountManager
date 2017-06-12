import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { Platform } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { GooglePlus } from '@ionic-native/google-plus';
import * as firebase from 'firebase/app';
import 'rxjs/add/operator/map';

// https://github.com/angular/angularfire2/blob/master/docs/5-user-authentication.md

@Injectable()
export class Auth {
  loggedIn: boolean;
  userProfile: Observable<firebase.User>;

  constructor(public http: Http, public af: AngularFireAuth, public platform: Platform, private googlePlus: GooglePlus) {
    this.loggedIn = false;
    this.userProfile = af.authState;
    // afAuth.authState.subscribe((user: firebase.User) => {
    //   if (!user) {
    //     this.displayName = null;
    //     return;
    //   }
    //   this.displayName = user.displayName;      
    // });
  }

  doLogin() {
    if (this.platform.is('android')) {
      return this.googlePlusLogin();
    }
    else {
      return this.fireBaseLogin();
    }
  }

  googlePlusLogin() {
    return this.googlePlus.login({ 'webClientId' : '658095225206-i1amh87tv7mfjunlk4ifqb3ne2dc2mhr.apps.googleusercontent.com' }).then((userData) => {
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
    return this.af.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(a => {
      this.userProfile = a.auth as any;
      this.loggedIn = true;
    }).catch(error => {
    });
  }

  doLogout() {
    this.af.auth.signOut().then(reason => {}).catch(error => {});
    this.loggedIn = false;
    this.userProfile = null;
  }
}
