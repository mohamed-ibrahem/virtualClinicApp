import {Component} from '@angular/core';
import {AlertController, Events, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {VirtualClinicApp} from "../providers/VirtualClinicApp";
import {LoginPage} from "../pages/login/login";
import {TabsPage} from "../pages/tabs/tabs";
import 'rxjs/add/operator/finally';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = null;

  constructor(platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              alertCtrl: AlertController,
              app: VirtualClinicApp,
              events: Events) {
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
              app.auth.token.then((token) => {
                if (token) {
                  app.http.options = {
                    headers: app.http.options.headers.append('Authorization', 'Bearer ' + token)
                  };

                  this.rootPage = TabsPage;
                } else
                  this.rootPage = LoginPage;
              });
                statusBar.styleDefault();
                splashScreen.hide();

                app.loading('adding_url');

                setTimeout(() => {
                  app.clearLoading('adding_url');
                }, 2000)
            }
          }
        ]
      });

      events.subscribe('user:login', () => {
        app.auth.token.then((token) => {
          app.http.options = {
            headers: app.http.options.headers.append('Authorization', 'Bearer ' + token)
          };
        })
      });
      events.subscribe('user:logout', () => {
        app.http.options = {
          headers: app.http.options.headers.delete('Authorization')
        };
      });
    });
  }
}
