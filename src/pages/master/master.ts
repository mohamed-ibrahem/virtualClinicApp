import {Component} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {LoginPage} from "../login/login";
import {VirtualClinicApp} from "../../providers/VirtualClinicApp";
import {HomePage} from "../home/home";

@IonicPage()
@Component({
  selector: 'page-master',
  templateUrl: 'master.html',
})
export class MasterPage {
  constructor(public navCtrl: NavController, public app: VirtualClinicApp) {
  }

  goTo(event, type) {
    this.app.initApp();

    if (type === 'app') {
      this.app.auth.token.then(
        token => this.navCtrl.push(HomePage),
        () => this.navCtrl.push(LoginPage)
      );
    }
  }
}
