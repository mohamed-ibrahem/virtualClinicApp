import {Component} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {LoginPage} from "../login/login";
import {VirtualClinicApp} from "../../providers/VirtualClinicApp";
import {TabsPage} from "../tabs/tabs";

@IonicPage()
@Component({
  selector: 'page-master',
  templateUrl: 'master.html',
})
export class MasterPage {
  constructor(public navCtrl: NavController, public app: VirtualClinicApp) {
  }

  goTo(event, type) {
    this.app.initApp().then(() => {
      if (type === 'app') {
        this.app.auth.token.then(
          token => this.navCtrl.push(TabsPage),
          () => this.navCtrl.push(LoginPage)
        );
      }
    });
  }
}
