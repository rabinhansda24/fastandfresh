import { Component } from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {RestProvider} from "../../providers/rest/rest";
import {Http} from "@angular/http";
import { Storage } from '@ionic/storage';
import { TrackOrderPage } from '../track-order/track-order';

/**
 * Generated class for the CheckoutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html',
})
export class CheckoutPage {
  email:string;
  items:any;
  errorMessage:string;
  data: any = {};
  totalAmount:any;
  phone: any;
  address: any;
  promo:string;
  msg: any;
  last_orderid:any;
  orderid:any;
  otpVallid: any;
  m:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public loading: LoadingController, public http: Http, private storage: Storage, public rest: RestProvider, private toastCtrl: ToastController) {
    storage.get('email').then((val) => {
      this.email = val;

    });
    storage.get('phone').then((val) => {
      this.phone = val;
    });
    storage.get('address').then((val) => {
      this.address = val;
    });
    this.promo = '';
  }

  ionViewDidLoad() {
    let loader = this.loading.create({
      content : 'Getting cart...',
    });

    loader.present().then(() => {
      this.getCart();
      this.getTotal();
      console.log("total:"+this.totalAmount);

    });
    loader.dismiss();
  }
  getCart() {
    this.storage.get('email').then((val) => {
      this.rest.getCart(val)
        .subscribe(
          items => this.items = items,
          error => this.errorMessage = <any>error
        );
    });

  }
  getTotal() {
    this.storage.get('email').then((val) => {
      this.rest.getTotalAmount(val)
        .subscribe(
          amount => this.totalAmount = amount,
          error => this.errorMessage = <any>error
        );

    });

  }
/*  otpVerify() {
    var link1 = 'https://fastandfresh.org/api/otpVerify.php';
    var otpV = JSON.stringify({email: this.email, otp: this.data.otp});
    this.http.post(link1, otpV)
      .subscribe(
        data => {
          this.otpVallid = data["_body"];
          //console.log(this.otpVallid);

        },
        error => {}
      );
      //console.log('a'+this.otpVallid);
  }*/

  checkOut() {
    var link1 = 'https://fastandfresh.org/api/otpVerify.php';
    var otpV = JSON.stringify({email: this.email, otp: this.data.otp});
    this.http.post(link1, otpV)
      .subscribe(
        data => {
          this.otpVallid = data["_body"];
          //console.log(this.otpVallid);
          if (this.otpVallid == 'vallid') {
            var link = 'https://fastandfresh.org/api/orderCheckout.php';
            var order = JSON.stringify({email: this.email,address: this.address , contact: this.phone, items: this.items, coupon: this.data.promo});
            console.log(order);
            this.http.post(link, order)
              .subscribe(data => {
                this.data.status = data["_body"];
                console.log('API called');
                console.log(this.data.status);
                var resData = JSON.parse(this.data.status);
                console.log(resData.orderid);
                this.orderid = resData.orderid;
                this.storage.set('orderid',this.orderid);
                let toast = this.toastCtrl.create({
                  message: this.data.status,
                  duration: 3000,
                  position: 'bottom'
                });
                toast.present();

                //this.storage.set('orderid', this.orderid);
                this.navCtrl.setRoot('TrackOrderPage',{orderid: this.orderid});

              }, error => {

                let toast = this.toastCtrl.create({
                  message: this.data.status,
                  duration: 3000,
                  position: 'bottom'
                });
                toast.present();
              });
          } else {
            let toast = this.toastCtrl.create({
              message: this.data.status,
              duration: 3000,
              position: 'bottom'
            });
            toast.present();
          }
        },
        error => {
          let toast = this.toastCtrl.create({
            message: error,
            duration: 3000,
            position: 'bottom'
          });
          toast.present();
        }
      );

  }
  applyCoupon() {

  }

}
