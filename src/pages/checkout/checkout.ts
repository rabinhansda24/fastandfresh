import { Component } from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {RestProvider} from "../../providers/rest/rest";
import {Http} from "@angular/http";
import { Storage } from '@ionic/storage';

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
  last_orderid:any;
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
      setTimeout(() => {
        loader.dismiss();
      }, 3000);
    });
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
  checkOut() {
    this.rest.getLastOrderId()
      .subscribe(
        orderid => this.last_orderid = orderid,
        error => this.errorMessage = <any>error
      );
    //console.log('lastorderid'+this.last_orderid[0].lastorderid);
    if(this.last_orderid) {
      this.last_orderid = this.last_orderid + 1;
    } else {
      this.last_orderid = '12101001';
    }

    for( let item of this.items) {
      var link = 'https://fastandfresh.org/api/orderCheckout.php';
      var tiffinRequest = JSON.stringify({orderid: this.last_orderid, email: this.email, contact: this.phone, item: item.item_id, quantity: item.quantity, price: item.price});

      this.http.post(link, tiffinRequest)
        .subscribe(data => {
          this.data.status = data["_body"];
          let toast = this.toastCtrl.create({
            message: this.data.status,
            duration: 3000,
            position: 'bottom'
          });
          toast.present();
        }, error => {

          let toast = this.toastCtrl.create({
            message: this.data.status,
            duration: 3000,
            position: 'bottom'
          });
          toast.present();
        });
    }
  }

}
