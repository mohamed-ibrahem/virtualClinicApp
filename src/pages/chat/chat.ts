import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import {VirtualClinicApp} from "../../providers/VirtualClinicApp";
import {FormBuilder, Validators} from "@angular/forms";

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
  public user;
  public chat;
  public messages = [];

  constructor(public navParams: NavParams, public app: VirtualClinicApp, public fb: FormBuilder) {
    this.user = this.navParams.get('user');

    this.chat = this.fb.group({
      message: ['', Validators.required],
      user_id: [this.user.id],
      client_id: [1]
    })
  }
}
