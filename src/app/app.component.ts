import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {MasterPage} from "../pages/master/master";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = MasterPage;

  constructor(platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
