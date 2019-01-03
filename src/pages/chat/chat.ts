import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {VirtualClinicApp} from "../../providers/VirtualClinicApp";
import {FormBuilder, Validators} from "@angular/forms";
import {HomePage} from "../home/home";
import {UserProvider} from "../../providers/models/user";

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
  public user;
  public chat;
  public messages = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public app: VirtualClinicApp,
    public users: UserProvider,
    public fb: FormBuilder
  ) {
    this.user = this.navParams.get('user');
    this.users.message.getAll(this.user.id)
      .subscribe((data) => this.messages = data.messages);

    this.chat = this.fb.group({
      message: ['', Validators.required],
      user: [this.user.id]
    })
  }

  send() {
    this.users.message.send(this.chat.value).subscribe((data) => {
      if (data.status)
        this.messages.push({
          type: 'outgoing',
          message: data.status.message
        });
    });
  }

  getClasses(messageType) {
    return {
      incoming: messageType === 'incoming',
      outgoing: messageType === 'outgoing',
    };
  }

  searchAbout(speciality) {
    this.navCtrl.setRoot(HomePage, {
      search: speciality
    }, {
      animate: true
    })
  }
}
