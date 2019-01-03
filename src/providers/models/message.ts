import { Injectable } from '@angular/core';
import {VirtualClinicApp} from "../VirtualClinicApp";

@Injectable()
export class MessageProvider {
  channel;

  constructor(public app: VirtualClinicApp) {}

  setAuth(user) {
  }

  getAll(id) {
    return this.app.http.get(`api/users/messages/${id}`);
  }

  send(data) {
    return this.app.http.post('api/users/messages', data);
  }
}
