import {Injectable} from '@angular/core';
import {VirtualClinicApp} from "../VirtualClinicApp";
import {MessageProvider} from "./message";

@Injectable()
export class UserProvider {
  public auth: any;

  constructor(public app: VirtualClinicApp, public message: MessageProvider) {
  }

  search(input) {
    return this.app.http.post('api/users/search', {
      input
    })
  }

  getAuth() {
    this.app.http.get('api/users/auth')
      .subscribe((response) =>
          this.updateAuth(response.data),
        (error) => {
          if (error.status === 401)
            this.app.auth.logout();
        })
  }

  update(data) {
    return new Promise((resolve, reject) => {
      this.app.http.put('api/users/auth/update', data)
        .subscribe(
          response => resolve(this.updateAuth(response.data)),
          error => reject(error.error)
        );
    })
  }

  updateAuth(data) {
    this.auth = data;
    let messages = {
      completed: this.auth.messages.filter((message) => message.messages.length),
      unCompleted: this.auth.messages.filter((message) => !message.messages.length)
    };

    this.auth.messages = messages;

    return this.auth;
  }

  rate(user, rate) {
    return this.app.http.post('api/users/' + user + '/rate', {rate});
  }
}
