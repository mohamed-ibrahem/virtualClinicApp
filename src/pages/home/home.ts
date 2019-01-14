import {Component} from '@angular/core';
import {NavParams} from 'ionic-angular';
import {VirtualClinicApp} from "../../providers/VirtualClinicApp";
import {UserProvider} from "../../providers/models/user";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  search = '';
  searchData: any;
  withoutCategories = false;
  oldData: any = {};
  complete: any;

  constructor(
    navParams: NavParams,
    public users: UserProvider,
    public app: VirtualClinicApp
  ) {
    let search = navParams.get('search');
    this.withoutCategories = navParams.get('withoutCategories');

    if (search) {
      this.openWith(search)
    }
  }

  ionViewDidEnter() {
    this.app.storage.get('userSearchAbout')
      .then((data) => this.oldData = data);
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

        this.app.storage.set('userSearchAbout', {
          users: this.checkArray(this.oldData.users.concat(data.data.users)),
        })
          .then(() => {
            this.app.storage.get('userSearchAbout')
              .then((data) => this.oldData = data);
          });
      });
  }

  openWith(category) {
    this.search = category;
    this.withoutCategories = true;
    this.searchAbout()
  }

  private checkArray(array: any) {
    return array.slice(Math.floor(Math.random() * array.length), 10);
  }
}
