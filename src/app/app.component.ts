import { Component } from '@angular/core';
import {AlertController, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {HttpProvider} from "../providers/helpers/http";
import {VirtualClinicApp} from "../providers/VirtualClinicApp";
import {LoginPage} from "../pages/login/login";
import {TabsPage} from "../pages/tabs/tabs";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = null;

  constructor (platform: Platform,
               statusBar: StatusBar,
               splashScreen: SplashScreen,
               alertCtrl: AlertController,
               http: HttpProvider,
               app: VirtualClinicApp)
  {
    platform.ready().then(() => {
      this.rootPage = app.auth.isAuth ? TabsPage : LoginPage;

      statusBar.styleDefault();
      splashScreen.hide();

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
              http.url = data.url;
              app.loading('adding_url');

              setTimeout(() => {
                app.clearLoading('adding_url');
              }, 2000)
            }
          }
        ]
      })
    });
  }
}
