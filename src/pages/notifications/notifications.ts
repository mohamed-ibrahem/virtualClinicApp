import {Component} from '@angular/core';
import {IonicPage} from 'ionic-angular';
import {UserProvider} from "../../providers/models/user";

@IonicPage()
@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
})
export class NotificationsPage {
  constructor(public users: UserProvider) {
  }
}
