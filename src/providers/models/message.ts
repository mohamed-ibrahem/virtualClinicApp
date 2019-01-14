import { Injectable } from '@angular/core';
import {VirtualClinicApp} from "../VirtualClinicApp";

@Injectable()
export class MessageProvider {
  constructor(public app: VirtualClinicApp) {}

  auth() {
    return this.app.http.get('api/users/messages');
  }

  getAll(id) {
    return this.app.http.get(`api/users/messages/${id}`);
  }

  send(data) {
    return this.app.http.post('api/users/messages', data);
  }

  seen(conversation) {
    return this.app.http.post('api/users/conversation/seen', {conversation});
  }
}
