import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import {LoginPage} from "../login/login";
import {UserProvider} from "../../providers/models/user";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  Home = HomePage;
  Account = LoginPage;

  user = {};

  constructor(public users: UserProvider) {}

  ngOnInit(){
    this.getUser()
  }

  getUser() {
    this.users.auth
      .subscribe((user) => this.user = user);
  }
}
