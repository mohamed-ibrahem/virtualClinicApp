import {Injectable} from '@angular/core';
import {HttpProvider} from "./helpers/http";
import {Storage} from "@ionic/storage";
import {AuthProvider} from "./auth/auth";
import {Functions} from "./helpers/functions";
import {Values} from "./values";

@Injectable()
export class VirtualClinicApp {
  constructor (
    public http: HttpProvider,
    public auth: AuthProvider,
    public values: Values,
    public functions: Functions,
    public storage: Storage
  ) {}

  initApp() {
    this.http.get('api/configure')
      .subscribe((data) => {
        console.log(data);
        this.values.updateLan(data.lan);
        this.values.updateLocales(data.locales);
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
