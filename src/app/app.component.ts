import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {RegisterPage} from "../pages/register/register";
import {VirtualClinicApp} from "../providers/VirtualClinicApp";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = RegisterPage;

  constructor(platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              app: VirtualClinicApp) {
    platform.ready().then(() => {
      app.presentAlert('Enter base url', null, {
        inputs: [
          {
            name: 'url',
            placeholder: 'URL'
          },
        ],
        buttons: [
          {
            text: 'Save',
            handler: data => {
              app.http.url = data.url;
              statusBar.styleDefault();
              splashScreen.hide();
              app.initApp();
            }
          }
        ]
      });

    });
  }
}
