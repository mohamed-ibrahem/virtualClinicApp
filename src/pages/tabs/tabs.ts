import { Component } from '@angular/core';

import {UserProvider} from "../../providers/models/user";
import { HomePage } from '../home/home';
import {AccountPage} from "../account/account";
import {MessagesPage} from "../messages/messages";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  Home = HomePage;
  Account = AccountPage;
  Message = MessagesPage;

  constructor (public users: UserProvider) {}
}
