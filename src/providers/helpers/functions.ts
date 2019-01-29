import {Injectable} from "@angular/core";
import {ActionSheetController, AlertController, LoadingController, ToastController} from "ionic-angular";

@Injectable()
export class Functions {
  private queries = [];

  constructor(
    public alert: AlertController,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public actionSheet: ActionSheetController
  ) {
  }

  presentAlert(title, text, options) {
    return this.alert.create(Object.assign({
      title: title,
      subTitle: text
    }, options)).present();
  }

  presentToast(message, options?) {
    this.toastCtrl.create(Object.assign({
      message: message,
      duration: 1200,
      position: 'bottom',
      dismissOnPageChange: false
    }, options)).present();
  }

  presentActionSeet(options) {
    this.actionSheet.create(options).present();
  }

  loading(name) {
    this.queries.push(name);
  }

  clearLoading(name?) {
    if (name) this.queries.splice(name, 1);
    else this.queries = [];
  }

  get isLoading(): boolean {
    return !!this.queries.length;
  }

  resize($event) {
    let input = $event.currentTarget;

    input.style.height = input.scrollHeight + 'px';
  }
}
