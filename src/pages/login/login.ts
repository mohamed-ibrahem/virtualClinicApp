import {Component} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {VirtualClinicApp} from "../../providers/VirtualClinicApp";
import {FormBuilder, Validators} from "@angular/forms";
import {TabsPage} from "../tabs/tabs";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  credentials;

  constructor(
    public navCtrl: NavController,
    public fb: FormBuilder,
    public app: VirtualClinicApp
  ) {
    this.credentials = this.fb.group({
      username: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.min(6)])]
    })
  }

  login() {
    this.app.auth.login(this.credentials.value)
      .then(() => {
        this.app.presentToast('Welcome back :)');

        this.navCtrl.setRoot(TabsPage);
      }, (err) => {
        this.app.presentToast(err.error.message);
      });
  }
}
