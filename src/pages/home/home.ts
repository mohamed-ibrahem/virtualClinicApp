import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {VirtualClinicApp} from "../../providers/VirtualClinicApp";
import {UserProvider} from "../../providers/models/user";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  user = {};
  search = '';
  searchData : any = [];

  constructor(public navCtrl: NavController, navParams: NavParams, public app: VirtualClinicApp, public users: UserProvider) {
    let search = navParams.get('search');
    if (search) {
      this.search = search;
      this.searchAbout();
    }
  }

  searchAbout() {
    this.users.search(this.search.trim())
      .subscribe((data) => this.searchData = data.data);
  }
}
