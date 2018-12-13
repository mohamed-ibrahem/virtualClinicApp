import {Injectable} from '@angular/core';
import {HttpProvider} from "./helpers/http";
import {Storage} from "@ionic/storage";
import {AuthProvider} from "./auth/auth";
import {Functions} from "./helpers/functions";

@Injectable()
export class VirtualClinicApp {
  constructor (
    public http: HttpProvider,
    public auth: AuthProvider,
    public functions: Functions,
    public storage: Storage
  ) {}

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
