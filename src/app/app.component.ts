import {Component, ViewChild} from '@angular/core';
import {Events, Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {MasterPage} from "../pages/master/master";
import {TabsPage} from "../pages/tabs/tabs";
import {LoginPage} from "../pages/login/login";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = MasterPage;

  constructor(platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              events: Events) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();

      events.subscribe('user:loggedIn', () => {
        this.nav.setRoot(TabsPage, {}, {
          animate: true
        });
      });

      events.subscribe('user:loggedOut', () =>
        this.nav.setRoot(LoginPage, {}, {
          animate: true
        })
      );
    });
  }
}
