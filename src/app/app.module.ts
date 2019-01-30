import {NgModule, ErrorHandler} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';

import {HomePage} from '../pages/home/home';
import {TabsPage} from '../pages/tabs/tabs';
import {LoginPage} from "../pages/login/login";

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import { FCM } from '@ionic-native/fcm';
import {AuthProvider} from '../providers/helpers/auth';
import {HttpProvider} from '../providers/helpers/http';
import {HttpClientModule} from "@angular/common/http";
import {VirtualClinicApp} from "../providers/VirtualClinicApp";
import {IonicStorageModule} from "@ionic/storage";
import {Functions} from "../providers/helpers/functions";
import {RegisterPage} from "../pages/register/register";
import {Values} from "../providers/helpers/values";
import {MasterPage} from "../pages/master/master";
import {WithKeysPipe} from "../pipes/with-keys/with-keys";
import {UserProvider} from '../providers/models/user';
import {IonicSelectableModule} from "ionic-selectable";
import {ChatPage} from "../pages/chat/chat";
import {MessageProvider} from "../providers/models/message";
import {PusherProvider} from "../providers/helpers/pusher";
import {ComponentsModule} from "../components/components.module";
import {AccountPage} from "../pages/account/account";
import {MessagesPage} from "../pages/messages/messages";
import {CanRateFilterPipe} from "../pipes/can-rate-filter/can-rate-filter";
import {NotificationsPage} from "../pages/notifications/notifications";
import {Camera} from "@ionic-native/camera";

@NgModule({
  declarations: [
    MyApp,
    MasterPage,
    TabsPage,
    HomePage,
    LoginPage,
    RegisterPage,
    ChatPage,
    AccountPage,
    MessagesPage,
    NotificationsPage,

    WithKeysPipe,
    CanRateFilterPipe,
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
    IonicSelectableModule,
    ComponentsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MasterPage,
    TabsPage,
    HomePage,
    LoginPage,
    RegisterPage,
    ChatPage,
    AccountPage,
    MessagesPage,
    NotificationsPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    StatusBar,
    SplashScreen,
    FCM,
    Camera,
    AuthProvider,
    HttpProvider,
    Functions,
    Values,
    PusherProvider,
    VirtualClinicApp,
    UserProvider,
    MessageProvider
  ]
})
export class AppModule {
}
