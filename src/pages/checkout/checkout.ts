import { Component } from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {RestProvider} from "../../providers/rest/rest";
import {Http} from "@angular/http";
import { Storage } from '@ionic/storage';
import { TrackOrderPage } from '../track-order/track-order';
import { BillPage } from '../bill/bill';

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
  discount:any = 0;
  payableAmount:any;
  deliveryCharge:number = 30;
  percentage:any;
  lat:any;
  long:any;
  latlongupdate:any;
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
    this.storage.get('lat').then((val) => {
      this.lat = val;
    });
    this.storage.get('long').then((val) => {
      this.long = val;
    });
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
          amount => {
            this.totalAmount = amount
            //this.totalAmount = parseInt(this.totalAmount[0].total_amount);
            console.log(parseInt(this.totalAmount[0].total_amount)+this.deliveryCharge);
            this.storage.set('carttotal',this.totalAmount[0].total_amount);
            this.payableAmount = parseInt(this.totalAmount[0].total_amount) + this.deliveryCharge;
            this.storage.set('totalpayable',this.payableAmount);
            console.log(this.payableAmount);
          },
              error => {
                this.errorMessage = <any>error

          }
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
    console.log(this.lat,this.long,this.address);
    var link1 = 'https://fastandfresh.org/api/otpVerify.php';
    var otpV = JSON.stringify({email: this.email, otp: this.data.otp});
    let loader = this.loading.create({
      content : 'Placing order...',
    });

    loader.present().then(() => {
      this.http.post(link1, otpV)
        .subscribe(
          data => {
            this.otpVallid = data["_body"];
            //console.log(this.otpVallid);
            if (this.otpVallid == 'vallid') {

              var link = 'https://fastandfresh.org/api/orderCheckout.php';
              var order = JSON.stringify({email: this.email,address: this.address , contact: this.phone, items: this.items, coupon: this.data.promo,lat: this.lat, long: this.long});
              console.log(order);
              this.http.post(link, order)
                .subscribe(data => {
                  this.data.status = data["_body"];
                  //console.log('API called');
                  //console.log(this.data.status);
                  var resData = JSON.parse(this.data.status);
                  //console.log(resData.orderid);
                  this.orderid = resData.orderid;
                  console.log('orderid'+this.orderid);
                  this.storage.set('orderid',this.orderid);
                  let toast = this.toastCtrl.create({
                    message: this.data.status,
                    duration: 3000,
                    position: 'bottom'
                  });
                  toast.present();
                  if(this.data.paymentMethod == 'cod') {
                    let alert = this.alertCtrl.create({
                      title: 'Order Success',
                      subTitle: 'Your order has been placed.',
                      buttons: ['OK']
                    });
                    alert.present();

                  }
                  //this.storage.set('orderid', this.orderid);
                  //this.navCtrl.setRoot('TrackOrderPage',{orderid: this.orderid});

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

    });
    /*setTimeout(() => {
      var link11 = 'https://fastandfresh.org/api/updateLatLong.php';
      var latlong = JSON.stringify({email: this.email,lat: this.lat, long: this.long, orderid: this.orderid});
      console.log(latlong);
      this.http.post(link11, latlong)
        .subscribe(data => {
            this.latlongupdate = data["_body"];
            console.log('lt'+this.latlongupdate)
          },
          error => {
            console.log(error);
          });
    }, 3000);*/
    loader.dismiss();
    this.navCtrl.setRoot('TrackOrderPage',{orderid: this.orderid});
  }
  applyCoupon() {
    this.storage.set('coupon', this.data.promo);
    console.log('coupon:'+this.payableAmount);
    this.storage.get('coupon').then((val) => {
      var link = 'https://fastandfresh.org/api/applyCoupon.php';
      var promo = JSON.stringify({coupon: val,email: this.email});
      this.http.post(link, promo)
        .subscribe(data => {
          this.percentage = data["_body"];
          console.log('API called');
          if(this.percentage == 'reject') {
            console.log('This coupon is vallid only for the first order');
            let toast = this.toastCtrl.create({
              message: "This coupon is vallid only for the first order",
              duration: 3000,
              position: 'bottom'
            });
            toast.present();
          } else {
            console.log('per'+this.percentage);
            this.discount = (parseInt(this.totalAmount[0].total_amount) * parseInt(this.percentage)/100);
            console.log('discount:'+this.discount);
            this.storage.set('discount',this.percentage);
            this.payableAmount = this.payableAmount - this.discount;
            console.log('payable:'+this.payableAmount);
            this.storage.set('payableAmount',this.payableAmount);
          }


        },
        error => {
          let toast = this.toastCtrl.create({
            message: error,
            duration: 3000,
            position: 'bottom'
          });
          toast.present();
        })
    });
  }

}
