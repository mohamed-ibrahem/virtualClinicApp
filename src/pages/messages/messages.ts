import {Component} from '@angular/core';
import {IonicPage} from 'ionic-angular';
import {UserProvider} from "../../providers/models/user";

@IonicPage()
@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html',
})
export class MessagesPage {
  constructor(public users: UserProvider) {
  }
}
