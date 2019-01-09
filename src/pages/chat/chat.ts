import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {VirtualClinicApp} from "../../providers/VirtualClinicApp";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HomePage} from "../home/home";
import {UserProvider} from "../../providers/models/user";
import {PusherProvider} from "../../providers/helpers/pusher";

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
  public user;
  public chat: FormGroup;
  public messages = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public app: VirtualClinicApp,
    public users: UserProvider,
    public pusher: PusherProvider,
    public fb: FormBuilder
  ) {
    this.user = this.navParams.get('user');

    this.users.message.getAll(this.user.id)
      .subscribe((data) => {
        this.user = data.user;
        this.messages = data.messages.messages;

        this.pusher.init(`private-conversation-${data.messages.id}`, data.options)
          .bind('App\\Events\\MessageSent', (response) => {
            this.messages.push(response.message);
            this.users.message.seen(data.messages.id);
          });

        this.messages.forEach((message) => {
          this.pusher.init(`private-message-${message.id}-seen`, data.options)
            .bind('App\\Events\\MessageSeen', () => {
              this.messages.forEach((message) => {
                message.isSeen = true;
              });
            });
        })
      });

    this.chat = this.fb.group({
      message: ['', Validators.required],
      user: [this.user.id]
    })
  }

  send() {
    this.users.message.send(this.chat.value).subscribe(() => {
      this.chat.get('message').reset();
    });
  }

  searchAbout(speciality) {
    this.navCtrl.setRoot(HomePage, {
      search: speciality
    }, {
      animate: true
    })
  }
}
