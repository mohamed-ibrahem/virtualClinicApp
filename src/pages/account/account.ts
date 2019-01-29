import {Component} from '@angular/core';
import {IonicPage} from 'ionic-angular';
import {FormBuilder, Validators} from "@angular/forms";
import {UserProvider} from "../../providers/models/user";
import {VirtualClinicApp} from "../../providers/VirtualClinicApp";
import {Camera} from "@ionic-native/camera";

@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {
  imageData;
  account;
  user;

  constructor(formBuilder: FormBuilder,
              protected camera: Camera,
              public app: VirtualClinicApp,
              public users: UserProvider) {
    this.user = this.users.auth;

    this.account = formBuilder.group({
      name: [this.user.name, [Validators.required]],
      email: [this.user.email, [Validators.required]],
      phone: [(this.user.phone ? this.user.phone : ''), [Validators.required]],
      old_password: [''],
      password: [''],
      password_confirmation: [''],
      age: [this.user.age, [Validators.required]],
      country: [this.user.country_code, [Validators.required]],
      gender: [this.user.gender.toLowerCase(), [Validators.required]],
      description: [this.user.description, [Validators.required]],
      img: ['']
    }, {updateOn: 'blur'});
  }

  logout() {
    this.app.auth.logout();
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

  public takePicture(sourceType) {
    this.camera.getPicture({
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: true,
      allowEdit: true,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }).then((base64File) => {
        base64File = 'data:image/jpeg;base64,' + base64File;
        this.imageData = base64File;
        this.account.controls['img'].setValue(base64File);
        this.account.controls['img'].markAsDirty();
      },
      (err) => this.app.presentToast('Error while selecting image.'));
  }

  update() {
    return this.users.update(this.account.value).then(
      () => {
      },
      (response) => {
        this.app.presentToast(response.message);

        Object.keys(response.errors).forEach((input) => {
          this.account.controls[input].setErrors({
            error: response.errors[input][0]
          }, {
            emitEvent: true
          });
        })
      })
  }
}
