import {Component, ViewChild} from '@angular/core';
import {Events, Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {MasterPage} from "../pages/master/master";
import {TabsPage} from "../pages/tabs/tabs";
import {LoginPage} from "../pages/login/login";
import {VirtualClinicApp} from "../providers/VirtualClinicApp";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = MasterPage;

  constructor(platform: Platform,
              app: VirtualClinicApp,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              events: Events) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();

      app.fcm.getToken().then(token => {
        app.http.options.headers = app.http.options.headers.append('fcm_token', token);
      });

      app.fcm.onNotification().subscribe((data) => {
        app.presentAlert('Notification', 'test');
      });

      events.subscribe('user:loggedIn', () => {
        this.nav.setRoot(TabsPage, {}, {
          animate: true
        });

        app.fcm.onTokenRefresh().subscribe(token => {
          app.http.options.headers = app.http.options.headers.append('fcm_token', token);
        });
      });

      events.subscribe('user:loggedOut', () => {
        app.http.options.headers = app.http.options.headers.delete('fcm_token');

        this.nav.setRoot(LoginPage, {}, {
          animate: true
        })
      });
    });
  }
}
