import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class Auth {
  
  loggedIn: boolean;

  constructor(public http: Http) {
    this.loggedIn = false;
  }

  doLogin() {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.loggedIn = true;
        resolve(this.loggedIn);
      }, 1000);
    });
  }

  doLogout() {
    this.loggedIn = false;
  }
}
