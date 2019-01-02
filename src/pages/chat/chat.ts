import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {VirtualClinicApp} from "../../providers/VirtualClinicApp";
import {FormBuilder, Validators} from "@angular/forms";
import {HomePage} from "../home/home";

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
    public fb: FormBuilder
  ) {
    this.user = this.navParams.get('user');

    this.chat = this.fb.group({
      message: ['', Validators.required],
      user_id: [this.user.id]
    })
  }

  searchAbout(speciality) {
    this.navCtrl.setRoot(HomePage, {
      search: speciality
    }, {
      animate: true
    })
  }
}
