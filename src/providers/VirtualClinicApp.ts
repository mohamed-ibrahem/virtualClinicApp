import {Injectable} from '@angular/core';
import {HttpProvider} from "./helpers/http";
import {Storage} from "@ionic/storage";
import {AuthProvider} from "./helpers/auth";
import {Functions} from "./helpers/functions";
import {Values} from "./helpers/values";
import {PusherProvider} from "./helpers/pusher";
import {Events} from "ionic-angular";
import {FCM} from "@ionic-native/fcm";

@Injectable()
export class VirtualClinicApp {
  constructor(
    public http: HttpProvider,
    public auth: AuthProvider,
    public values: Values,
    public functions: Functions,
    public storage: Storage,
    public events: Events,
    public pusher: PusherProvider,
    private fcm: FCM
  ) {
    this.events.subscribe('user:loggedOut', () => {
      this.http.setTokenToHeaders();
    });
  }

  initApp() {
    return new Promise(res => {
      this.http.setUrl().then(() => {
        this.http.get('api/configure')
          .subscribe((data) => {
            this.values.update(data);

            this.auth.token.then((token) => {
              this.http.setTokenToHeaders(token);
              this.fcm.getToken().then(token =>
                this.http.put('api/users/auth/update-token', {token})
              );

              this.fcm.onTokenRefresh().subscribe(token => {
                this.http.put('api/users/auth/update-token', {token})
              });

              this.fcm.onNotification().subscribe(data => {
              });

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

  presentActionSeet(options) {
    return this.functions.presentActionSeet(options);
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
