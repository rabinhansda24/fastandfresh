import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {LoginPage} from "../login/login";
import {SignupPage} from "../signup/signup";
import {RestProvider} from "../../providers/rest/rest";
import {CartPage} from "../cart/cart";
import {Http} from "@angular/http";
import {Device} from "@ionic-native/device";

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 *
 * // set a key/value
 storage.set('name', 'Max');

 // Or to get a key/value pair
 storage.get('age').then((val) => {
    console.log('Your age is', val);
  });
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  data: any = {};
  isLogedin : string;
  islogout: string;
  cartn: any;
  errorMessage: string;
  signout: any;
  logedin: string = 'show-login';
  notlogin: string = 'show-none';
  constructor(public navCtrl: NavController,private toastCtrl: ToastController,public http: Http, public navParams: NavParams, private storage: Storage, public rest: RestProvider, private device: Device) {

    storage.get('name').then((val) => {
      this.data.name = val;

    });
    storage.get('email').then((val) => {
      this.data.email = val;
      this.notlogin = 'show-none';
    });
    storage.get('phone').then((val) => {
      this.data.phone = val;
    });
    storage.get('address').then((val) => {
      this.data.address = val;
    });
    this.data.deviceid = this.device.uuid;

  }

  ionViewDidLoad() {

    this.getCount();
    if(this.data.email == '') {
      this.navCtrl.push(LoginPage);
    }

  }
  showCart() {
    this.navCtrl.push('CartPage');
  }
  login() {
    this.navCtrl.push(LoginPage);
  }
  register() {
    this.navCtrl.push(SignupPage);
  }
  logout() {
    this.storage.clear();
    this.logedin = 'show-none';
    this.notlogin = 'show-login';

  }
  getCount() {
    this.storage.get('email').then((val) => {
      this.rest.getCartCount(val)
        .subscribe(
          count => this.cartn = count,
          error => this.errorMessage = <any>error
        );
      //this.n = this.cartn.cart_count;
    });


  }

}
