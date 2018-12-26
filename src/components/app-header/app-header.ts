import {Component, Input} from '@angular/core';
import {VirtualClinicApp} from "../../providers/VirtualClinicApp";
import {ActionSheetController} from "ionic-angular";

@Component({
  selector: 'app-header',
  templateUrl: 'app-header.html'
})
export class AppHeaderComponent {
  @Input('title') title: string;
  @Input('with-header') header = 'true';

  constructor(public app: VirtualClinicApp, public actionCtrl: ActionSheetController) {
  }

  changeLang() {
    let buttons = [];

    for (let locale in this.app.values.locales) {
      buttons.push({
        text: this.app.values.locales[locale].name,
        handler: () => {
          this.app.values.setLocale(this.app.values.locales[locale].regional);
        }
      });
    }

    this.actionCtrl.create({
      title: this.app.values.get('global.change_lang', 'Select Your Language'),
      buttons
    }).present();
  }
}
