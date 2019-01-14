import {Component} from '@angular/core';
import {IonicPage} from 'ionic-angular';
import {FormBuilder, Validators} from "@angular/forms";
import {UserProvider} from "../../providers/models/user";
import {VirtualClinicApp} from "../../providers/VirtualClinicApp";

@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {
  account;

  constructor(formBuilder: FormBuilder, public app: VirtualClinicApp, public users: UserProvider) {
    let user = this.users.auth;

    this.account = formBuilder.group({
      name: [user.name, [Validators.required]],
      gender: [user.gender, [Validators.required]],
    });
  }

  logout() {
    this.app.auth.logout();
  }
}
