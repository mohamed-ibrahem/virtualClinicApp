import {Component, ViewChild} from '@angular/core';
import {Content, IonicPage, NavController, NavParams} from 'ionic-angular';
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
  @ViewChild(Content) content: Content;

  private _pusher;
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

        this.pusher.options = data.options;
        this._pusher = this.pusher.init();

        this._pusher.subscribe(`private-conversation-${data.messages.id}`)
          .bind('App\\Events\\MessageSent', (response) => {
            this.messages.push(response.message);
            this.ionViewDidEnter();

            if (response.message.sender == this.user.id)
              this.app.http.post(`api/users/message/${response.message.id}/seen`, {}).subscribe();
          });

        this.messages.filter((message) => {
          return message.sender == this.user.id && ! message.isSeen;
        }).forEach((message) => {
          this.app.http.post(`api/users/message/${message.id}/seen`, {}).subscribe();
        });

        this.messages.filter((message) => {
          return message.sender != this.user.id && ! message.isSeen;
        }).forEach((message) => {
          this._pusher.subscribe(`private-message-${message.id}-seen`)
            .bind('App\\Events\\MessageSeen', () => {
              message.isSeen = true;
            });
        });
      });

    this.chat = this.fb.group({
      message: ['', Validators.required],
      user: [this.user.id]
    })
  }

  ionViewDidEnter() {
    let dimensions = this.content.getContentDimensions();
    this.content.scrollTo(0, dimensions.contentHeight+100, 100);
  }

  send() {
    this.users.message.send(this.chat.value).subscribe(() => {
      this.chat.get('message').reset();
    });
  }

  searchAbout(speciality) {
    this.navCtrl.setRoot(HomePage, {
      search: speciality,
      withoutCategories: true
    }, {
      animate: true
    })
  }
}
