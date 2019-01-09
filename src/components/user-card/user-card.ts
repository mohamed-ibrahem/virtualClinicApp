import {Component, Input} from '@angular/core';
import {VirtualClinicApp} from "../../providers/VirtualClinicApp";
import {NavController} from "ionic-angular";
import {ChatPage} from "../../pages/chat/chat";

@Component({
  selector: 'user-card',
  templateUrl: 'user-card.html'
})
export class UserCardComponent {
  @Input('user') user : any = {};

  constructor(public app: VirtualClinicApp, public navCtrl: NavController) {}

  goToChat() {
    this.navCtrl.push(ChatPage,  {
      user: this.user
    });

    return true;
  }
}
