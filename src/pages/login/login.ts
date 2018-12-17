import {Component} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {VirtualClinicApp} from "../../providers/VirtualClinicApp";
import {FormBuilder, Validators} from "@angular/forms";
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
    if (this.credentials.value.email !== 'doctor1@system.app' && this.credentials.value.password !== 'doctor') {
      this.app.presentToast('These credentials do not match our records.');
    } else {
      this.app.presentToast('Welcome back :)');

      this.navCtrl.setRoot(TabsPage);
    }
  }

  forgotten() {
    if (this.credentials.value.email !== 'doctor1@system.app') {
      this.app.presentToast('We can\'t find a user with that e-mail address..');
    } else {
      this.app.presentToast('We have e-mailed your password reset link!');

      this.goToForgotten(false);
    }
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
