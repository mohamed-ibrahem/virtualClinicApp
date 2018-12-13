import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import {LoginPage} from "../login/login";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  Home = HomePage;
  Account = LoginPage;

  constructor() {}
}
