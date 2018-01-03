import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TrackOrderPage } from '../pages/track-order/track-order';
import { NotificationPage } from '../pages/notification/notification';
import { ChangeLocationPage } from '../pages/change-location/change-location';
import { FODDICTIONTiffinServicesPage } from '../pages/f-oddictiontiffin-services/f-oddictiontiffin-services';
import { PartnerWithFOODICTIONPage } from '../pages/partner-with-foodiction/partner-with-foodiction';
import { CallPage } from '../pages/call/call';
import { AboutPage } from '../pages/about/about';
import { ContactUsPage } from '../pages/contact-us/contact-us';
import { CateringPage } from '../pages/catering/catering';
import { ProfilePage } from  '../pages/profile/profile';
import { OrdersPage } from '../pages/orders/orders';
import { HomePage } from '../pages/home/home';
import { MenuPage } from  '../pages/menu/menu'
import { CurrentLocationPage } from '../pages/current-location/current-location';





@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) navCtrl: Nav;
    rootPage:any = 'CurrentLocationPage';

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    //splashScreen.show();
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      //statusBar.backgroundColorByHexString('#a86657');
      splashScreen.hide();
    });
  }
  goToHome(params){
    if (!params) params = {};
    this.navCtrl.setRoot(HomePage);
  }goToTrackOrder(params){
    if (!params) params = {};
    this.navCtrl.push('TrackOrderPage');
  }goToNotification(params){
    if (!params) params = {};
    this.navCtrl.push(NotificationPage);
  }goToChangeLocation(params){
    if (!params) params = {};
    this.navCtrl.push(ChangeLocationPage);
  }goToFODDICTIONTiffinServices(params){
    if (!params) params = {};
    this.navCtrl.push(FODDICTIONTiffinServicesPage);
  }goToPartnerWithFOODICTION(params){
    if (!params) params = {};
    this.navCtrl.push(PartnerWithFOODICTIONPage);
  }goToCall(params){
    if (!params) params = {};
    this.navCtrl.push(CallPage);
  }goToAbout(params){
    if (!params) params = {};
    this.navCtrl.push(AboutPage);
  }goToContactUs(params){
    if (!params) params = {};
    this.navCtrl.push(ContactUsPage);
  }goToCatering(params) {
    if (!params) params = {};
    this.navCtrl.push('CateringPage');
  }goToProfile(params) {
    if(!params) params = {};
    this.navCtrl.push('ProfilePage');
  }goToMenu(params) {
    if(!params) params = {};
    this.navCtrl.push('MenuPage');
  }goToOrders(params) {
  if(!params) params = {};
  this.navCtrl.push('OrdersPage');
  }
}
