import {Component} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {VirtualClinicApp} from "../../providers/VirtualClinicApp";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TabsPage} from "../tabs/tabs";
import {RegisterPage} from "../register/register";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  credentials;
  forgot = false;

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
    this.app.auth.login(this.credentials.value).then(() => {
      this.app.presentToast(this.app.values.get('auth.success'));
      this.navCtrl.setRoot(TabsPage);
    }, (error) => this.app.presentToast(error.message, {
      duration: 2500
    }));
  }

  forgotten() {
    this.app.auth.reset(this.credentials.value.username).then((data) => {
      this.app.presentToast(data);
      this.credentials.get('username').reset();
      this.goToForgotten(false);
    }, (error) => this.app.presentToast(error, {
      duration: 2500
    }));
  }

  goToForgotten(toggle = true) {
    if (toggle)
      this.credentials.controls.password.disable();
    else
      this.credentials.controls.password.enable();

    return this.forgot = toggle;
  }

  goToRegister() {
    return this.navCtrl.push(RegisterPage);
  }
}
