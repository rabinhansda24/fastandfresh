import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TrackOrderPage } from '../pages/track-order/track-order';
import { NotificationPage } from '../pages/notification/notification';
import { ChangeLocationPage } from '../pages/change-location/change-location';
import { FODDICTIONTiffinServicesPage } from '../pages/f-oddictiontiffin-services/f-oddictiontiffin-services';
import { PartnerWithFOODICTIONPage } from '../pages/partner-with-foodiction/partner-with-foodiction';
import { CallPage } from '../pages/call/call';
import { AboutPage } from '../pages/about/about';
import { ContactUsPage } from '../pages/contact-us/contact-us';
import { SignupPage } from '../pages/signup/signup';
import { LoginPage } from '../pages/login/login';
import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMaps } from '@ionic-native/google-maps';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule } from '@angular/http';

import {IonicStorageModule } from '@ionic/storage';
import { Device } from '@ionic-native/device';
import { RestProvider } from '../providers/rest/rest';
import {HttpClient, HttpClientModule} from "@angular/common/http";


@NgModule({
  declarations: [
    MyApp,
    HomePage,

    NotificationPage,
    ChangeLocationPage,
    FODDICTIONTiffinServicesPage,
    PartnerWithFOODICTIONPage,
    CallPage,
    AboutPage,
    ContactUsPage,
    SignupPage,
    LoginPage

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    HttpClientModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,

    NotificationPage,
    ChangeLocationPage,
    FODDICTIONTiffinServicesPage,
    PartnerWithFOODICTIONPage,
    CallPage,
    AboutPage,
    ContactUsPage,
    SignupPage,
    LoginPage


  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    GoogleMaps,
    Device,
    RestProvider,
    HttpClientModule,
    HttpClient,
    {provide: ErrorHandler, useClass: IonicErrorHandler},

  ]
})
export class AppModule {}
