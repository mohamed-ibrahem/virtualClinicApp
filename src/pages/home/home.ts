import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {VirtualClinicApp} from "../../providers/VirtualClinicApp";
import {UserProvider} from "../../providers/models/user";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  user = {};
  search = '';
  searchData : any;

  constructor(public navCtrl: NavController, public app: VirtualClinicApp, public users: UserProvider)
  {
    this.getUser();
  }

  getUser() {
    this.users.auth
      .subscribe((user) => this.user = user);
  }

  goToSearch() {
    if (this.search.trim().length > 3)
    this.users.search(this.search.trim())
      .subscribe((data) => this.searchData = data.data);
  }
}
