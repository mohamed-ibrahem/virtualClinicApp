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
    this.app.http.get('api/users/' + this.user.id).subscribe((user) => {
      this.navCtrl.push(ChatPage,  {
        user: user.data
      })
    })
  }
}
