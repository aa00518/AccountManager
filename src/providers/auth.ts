import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class Auth {
  
  constructor(public http: Http) {
  }

  doLogin() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(false);
      }, 3000);
    });
  }
}
