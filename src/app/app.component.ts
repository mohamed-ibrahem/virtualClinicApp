import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {LoginPage} from "../pages/login/login";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = LoginPage;

  constructor(platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // app.presentAlert('Enter base url', null, {
      //   inputs: [
      //     {
      //       name: 'url',
      //       placeholder: 'URL'
      //     },
      //   ],
      //   buttons: [
      //     {
      //       text: 'Save',
      //       handler: data => {
      //         app.http.url = data.url;
      //
      //       }
      //     }
      //   ]
      // });
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
