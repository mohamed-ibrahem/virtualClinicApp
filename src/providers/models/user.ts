import { Injectable } from '@angular/core';
import {VirtualClinicApp} from "../VirtualClinicApp";

@Injectable()
export class UserProvider {
  constructor(public app: VirtualClinicApp) {}

  get auth() {
    return this.app.http.get('api/users/getCurrent');
  }

  search(input) {
    return this.app.http.post('api/users/search', {
      input
    })
  }
}
