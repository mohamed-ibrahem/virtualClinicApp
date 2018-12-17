import {NgModule, ErrorHandler} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';

import {HomePage} from '../pages/home/home';
import {TabsPage} from '../pages/tabs/tabs';
import {LoginPage} from "../pages/login/login";

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {AuthProvider} from '../providers/auth/auth';
import {HttpProvider} from '../providers/helpers/http';
import {HttpClientModule} from "@angular/common/http";
import {AppHeaderComponent} from "../components/app-header/app-header";
import {VirtualClinicApp} from "../providers/VirtualClinicApp";
import {IonicStorageModule} from "@ionic/storage";
import {Functions} from "../providers/helpers/functions";
import {RegisterPage} from "../pages/register/register";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    LoginPage,
    RegisterPage,

    AppHeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp, {
      backButtonText: '',
      tabsPlacement: 'bottom',
      swipeBackEnabled: true
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    LoginPage,
    RegisterPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    StatusBar,
    SplashScreen,
    AuthProvider,
    HttpProvider,
    Functions,
    VirtualClinicApp
  ]
})
export class AppModule {
}
