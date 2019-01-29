import {Component, ViewChild} from '@angular/core';
import {Content, IonicPage, NavController, NavParams, PopoverController} from 'ionic-angular';
import {VirtualClinicApp} from "../../providers/VirtualClinicApp";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HomePage} from "../home/home";
import {UserProvider} from "../../providers/models/user";
import {PusherProvider} from "../../providers/helpers/pusher";
import {Camera} from "@ionic-native/camera";
import {ChatPopOverComponent} from "../../components/chat-pop-over/chat-pop-over";

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
  @ViewChild(Content) content: Content;

  private _pusher;
  private channels = [];
  public imageData;
  public user;
  public chat: FormGroup;
  items: FormArray;
  public messages = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public app: VirtualClinicApp,
    protected popover: PopoverController,
    public users: UserProvider,
    public pusher: PusherProvider,
    protected camera: Camera,
    public fb: FormBuilder
  ) {
    this.user = this.navParams.get('user');
    this.users.getAuth();

    this.users.message.getAll(this.user.id)
      .subscribe((data) => {
        this.user = data.user;
        this.messages = data.messages.messages;

        this._pusher = this.pusher.init(data.options);

        this.channels.push(`private-conversation-${data.messages.id}`);
        this._pusher.subscribe(`private-conversation-${data.messages.id}`)
          .bind('App\\Events\\MessageSent', (response) => {
            this.users.getAuth();
            this.messages.push(response.message);
            this.ionViewDidEnter();

            if (response.message.sender == this.user.id)
              this.app.http.post(`api/users/message/${response.message.id}/seen`, {}).subscribe();
          });

        let seenMessages = this.messages.filter((message) => {
          return message.sender == this.user.id && !message.isSeen;
        });

        if (seenMessages.length) {
          this.app.http.post(`api/users/message/${seenMessages.pop().id}/seen`, {}).subscribe();
        }

        let messages = this.messages.filter((message) => {
          return message.sender != this.user.id && !message.isSeen;
        });

        if (messages.length) {
          this.channels.push(`private-message-${messages.pop().id}-seen`);
          this._pusher.subscribe(`private-message-${messages.pop().id}-seen`)
            .bind('App\\Events\\MessageSeen', () => {
              messages.forEach((message) => message.isSeen = true);
            });
        }
      });

    this.chat = this.fb.group({
      inputType: ['message'],
      message: new FormArray([
        this.fb.group({
          message: ''
        })
      ]),
      img: new FormArray([]),
      user: [this.user.id]
    });

    this.chat.controls['inputType'].valueChanges.subscribe((val) => {
      let messages = <FormArray>this.chat.controls['message'];
      if (val === 'message') {
        messages.controls = [
          this.fb.group({
            message: ''
          })
        ];
      } else {
        messages.controls = [];
        this.addItem();
      }
    })
  }

  createItem(): FormGroup {
    return this.fb.group({
      message1: [''],
      message2: ['']
    });
  }

  addItem(): void {
    this.items = this.chat.get('message') as FormArray;
    this.items.push(this.createItem());
  }

  ionViewDidEnter() {
    let dimensions = this.content.getContentDimensions();
    this.content.scrollTo(0, dimensions.contentHeight + 100, 100);
  }

  ionViewWillLeave() {
    this.channels.forEach((channel) => {
      this._pusher.unsubscribe(channel);
    })
  }

  send() {
    this.users.message.send(this.chat.value).subscribe((response) => {
      this.chat.get('inputType').setValue('message');
      this.chat.get('img').reset();
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

  openPopOver(ev) {
    this.popover.create(ChatPopOverComponent, {
      form: this.chat
    }).present({ev});
  }
}
