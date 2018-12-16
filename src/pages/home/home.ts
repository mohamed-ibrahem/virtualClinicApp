import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {VirtualClinicApp} from "../../providers/VirtualClinicApp";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  username;

  constructor(public navCtrl: NavController, public app: VirtualClinicApp) {
    this.app.auth.user.subscribe((user) => {
      console.log(user);
    });
  }

}
