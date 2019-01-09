import {Injectable} from '@angular/core';
import {HttpProvider} from "./helpers/http";
import {Storage} from "@ionic/storage";
import {AuthProvider} from "./helpers/auth";
import {Functions} from "./helpers/functions";
import {Values} from "./helpers/values";
import {PusherProvider} from "./helpers/pusher";

@Injectable()
export class VirtualClinicApp {
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
        this.http.get('api/configure')
          .subscribe((data) => {
            this.values.update(data);

            this.auth.token.then((token) => {
              this.http.setTokenToHeaders(token);
              res(true);
            }, () => res(true));
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
