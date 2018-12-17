import {Injectable} from '@angular/core';
import {HttpProvider} from "../helpers/http";
import {Storage} from "@ionic/storage";

@Injectable()
export class AuthProvider {
  protected data = {
    'client_id': 2,
    'client_secret': '6dMrMwxk8ufVt96XzGxg3zdYSbIHA07feQ8ceWX1',
    'grant_type': 'password'
  };

  constructor(public storage: Storage, public http: HttpProvider) {
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
        }, (err) => rej(err))
    })
  }

  setToken(token, expiration) {
    this.storage.set('token', token)
      .then(() => {
        this.storage.set('expiration', expiration);
      });
  }

  destroyToken() {
    this.storage.remove('token');
    this.storage.remove('expiration');
  }

  get token() {
    return null;
  }
  get isAuth() {
    return this.token != null;
  }
  get user() {
    return null;
  }
}
