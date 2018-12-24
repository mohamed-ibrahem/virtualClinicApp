import {Component} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {LoginPage} from "../login/login";

@IonicPage()
@Component({
  selector: 'page-master',
  templateUrl: 'master.html',
})
export class MasterPage {
  constructor(public navCtrl: NavController) {
  }

  goTo(event, type) {
    if (type === 'app') {
      this.navCtrl.push(LoginPage)
    }
  }
}
