import {Injectable} from '@angular/core';
import {VirtualClinicApp} from "../VirtualClinicApp";
import {MessageProvider} from "./message";

@Injectable()
export class UserProvider {
  public auth: any;

  constructor(public app: VirtualClinicApp, public message: MessageProvider) {
    this.app.http.get('api/users/getCurrent')
      .subscribe((response) => {
        this.auth = response.data;
        let messages = {
          completed: this.auth.messages.filter((message) => message.messages.length),
          unCompleted: this.auth.messages.filter((message) => ! message.messages.length)
        };

        this.auth.messages = messages;
      })
  }

  search(input) {
    return this.app.http.post('api/users/search', {
      input
    })
  }
}
