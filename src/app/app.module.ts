import {NgModule, ErrorHandler} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';

import {HomePage} from '../pages/home/home';
import {TabsPage} from '../pages/tabs/tabs';
import {LoginPage} from "../pages/login/login";

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {AuthProvider} from '../providers/helpers/auth';
import {HttpProvider} from '../providers/helpers/http';
import {HttpClientModule} from "@angular/common/http";
import {AppHeaderComponent} from "../components/app-header/app-header";
import {VirtualClinicApp} from "../providers/VirtualClinicApp";
import {IonicStorageModule} from "@ionic/storage";
import {Functions} from "../providers/helpers/functions";
import {RegisterPage} from "../pages/register/register";
import {Values} from "../providers/helpers/values";
import {MasterPage} from "../pages/master/master";
import {WithKeysPipe} from "../pipes/with-keys/with-keys";
import {UserProvider} from '../providers/models/user';
import {UserCardComponent} from "../components/user-card/user-card";
import {IonicSelectableModule} from "ionic-selectable";
import {ChatPage} from "../pages/chat/chat";

@NgModule({
  declarations: [
    MyApp,
    MasterPage,
    TabsPage,
    HomePage,
    LoginPage,
    RegisterPage,
    ChatPage,

    WithKeysPipe,

    AppHeaderComponent,
    UserCardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp, {
      scrollPadding: false,
      scrollAssist: false,
      backButtonText: '',
      tabsPlacement: 'bottom',
      swipeBackEnabled: true,
      pageTransition: 'ios-transition'
    }),
    IonicSelectableModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MasterPage,
    TabsPage,
    HomePage,
    LoginPage,
    RegisterPage,
    ChatPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    StatusBar,
    SplashScreen,
    AuthProvider,
    HttpProvider,
    Functions,
    Values,
    VirtualClinicApp,
    UserProvider
  ],
  exports: [
    UserCardComponent
  ]
})
export class AppModule {
}
