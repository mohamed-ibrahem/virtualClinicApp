import {Injectable} from '@angular/core';
import {HttpProvider} from "../helpers/http";
import {Storage} from "@ionic/storage";

@Injectable()
export class AuthProvider {
  protected data = {
    'client_id': 2,
    'client_secret': 'Bv2J9hKFV5TPWabfrtlsueqjX3IQ0JtS1xctSj1P',
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
        this.storage.set('expiration', expiration);
      });
  }

  destroyToken() {
    this.storage.remove('token');
    this.storage.remove('expiration');
  }

  get token() {
    return new Promise((res, rej) => {
      this.storage.get('token').then((token) => {
        if (token) {
          this.storage.get('expiration').then((expiration) => {
            if (expiration && expiration > Date.now()) {
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

  get user() {
    return null;
  }
}
