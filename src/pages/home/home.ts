import { Component } from '@angular/core';
import {ModalController, NavController, NavParams} from 'ionic-angular';
import {VirtualClinicApp} from "../../providers/VirtualClinicApp";
import {UserProvider} from "../../providers/models/user";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  search = '';
  searchData : any = {};
  withoutCategories = false;

  constructor(
    public navCtrl: NavController,
    navParams: NavParams,
    public app: VirtualClinicApp,
    public users: UserProvider,
    public modal: ModalController
  ) {
    let search = navParams.get('search');
    this.withoutCategories = navParams.get('withoutCategories');

    if (search) {
      this.openWith(search)
    }
  }

  searchAbout() {
    if (this.search.trim().length == 0) {
      this.withoutCategories = false;
      this.searchData = {};

      return;
    }

    this.users.search(this.search.trim())
      .subscribe((data) => {
        this.searchData = data.data;
      });
  }

  openWith(category) {
    this.search = category;
    this.searchAbout()
  }
}
