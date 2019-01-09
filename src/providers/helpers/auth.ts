import {Injectable} from '@angular/core';
import {HttpProvider} from "./http";
import {Storage} from "@ionic/storage";
import {Events} from "ionic-angular";

@Injectable()
export class AuthProvider {
  protected data = {
    'client_id': 2,
    'client_secret': 'oYMAxE0w6mHkGufO0Jl0C5ADC6RG4ChO9zw1MYTf',
    'grant_type': 'password'
  };

  constructor(public storage: Storage, public events: Events, public http: HttpProvider) {
  }

  login(credentials) {
    return new Promise((res, rej) => {
      this.http.post('oauth/token', Object.assign(credentials, this.data))
        .subscribe((data) => {
          this.setToken(
            data.access_token,
            data.expires_in + Date.now()
          );

          res('success')
        }, (err) => rej(err.error))
    })
  }

  reset(email) {
    return new Promise((res, rej) => {
      this.http.post('api/password/email', {email})
        .subscribe((data) => res(data.status), (error) => rej(error.error.email))
    })
  }

  register(data) {
    return new Promise((res, rej) => {
      this.http.post('api/auth/register', data)
        .subscribe((data) => {
          this.login(data.credentials).then(() => res('success'), (err) => rej(err));
        }, (error) => {
          rej(error.error)
        })
    });
  }

  setToken(token, expiration) {
    this.storage.set('token', token)
      .then(() => {
        this.storage.set('expiration', expiration).then(() => {
          this.events.unsubscribe('user:loggedOut');
          this.events.publish('user:loggedIn', token);
        });
      });
  }

  destroyToken() {
    this.storage.remove('token');
    this.storage.remove('expiration');
    this.events.unsubscribe('user:loggedIn');
    this.events.publish('user:loggedOut');
  }

  get token() {
    return new Promise((res, rej) => {
      this.storage.get('token').then((token) => {
        if (token) {
          this.storage.get('expiration').then((expiration) => {
            if (expiration && parseInt(expiration) > Date.now()) {
              res(token);
            } else {
              this.destroyToken();
              rej(false);
            }
          })
        } else {
          rej(false);
        }
      });
    });
  }
}
