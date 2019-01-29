import { Component } from '@angular/core';
import {NavParams} from "ionic-angular";
import {VirtualClinicApp} from "../../providers/VirtualClinicApp";
import {Camera} from "@ionic-native/camera";
import {FormControl} from "@angular/forms";
import {UserProvider} from "../../providers/models/user";

@Component({
  selector: 'chat-pop-over',
  templateUrl: 'chat-pop-over.html'
})
export class ChatPopOverComponent {
  chat;

  constructor(
    private navParams: NavParams,
    protected camera: Camera,
    public app: VirtualClinicApp,
    public users: UserProvider
  ) {
    this.chat = this.navParams.get('form');
  }

  getPhoto() {
    this.app.presentActionSeet({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
  }

  takePicture(sourceType) {
    this.camera.getPicture({
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: false,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }).then((base64File) => {
        base64File = 'data:image/jpeg;base64,' + base64File;
        this.chat.controls['img'].push(new FormControl(base64File));
      },
      (err) => this.app.presentToast('Error while selecting image.'));
  }
}
