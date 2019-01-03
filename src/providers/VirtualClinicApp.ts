import {Injectable} from '@angular/core';
import {HttpProvider} from "./helpers/http";
import {Storage} from "@ionic/storage";
import {AuthProvider} from "./helpers/auth";
import {Functions} from "./helpers/functions";
import {Values} from "./helpers/values";
import {HttpHeaders} from "@angular/common/http";
import {PusherProvider} from "./helpers/pusher";

@Injectable()
export class VirtualClinicApp {
  private config = {
    options: {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, PATCH, DELETE, PUT',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      })
    }
  };

  constructor(
    public http: HttpProvider,
    public auth: AuthProvider,
    public values: Values,
    public functions: Functions,
    public storage: Storage,
    public pusher: PusherProvider
  ) {
  }

  initApp() {
    return new Promise(res => {
      this.http.setUrl().then(() => {
        this.http.get('api/configure', this.config.options)
          .subscribe((data) => {
            this.values.update(data);

            this.auth.token
              .then((token) => {
                this.config.options.headers = this.config.options.headers.append('Authorization', 'Bearer ' + token);

                this.http.options = this.config.options;
                res(true);
              }, () => {
                this.http.options = this.config.options;
                res(true);
              });

          });
      });
    })
  }

  presentAlert(title, text, options) {
    return this.functions.presentAlert(title, text, options);
  }

  presentToast(message, options?) {
    return this.functions.presentToast(message, options);
  }

  loading(name) {
    return this.functions.loading(name);
  }

  clearLoading(name?) {
    return this.functions.clearLoading(name);
  }

  get isLoading(): boolean {
    return this.functions.isLoading;
  }
}
