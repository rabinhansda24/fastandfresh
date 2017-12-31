import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {RestProvider} from "../../providers/rest/rest";
import {Http} from "@angular/http";
import { CheckoutPage } from  "../checkout/checkout";

/**
 * Generated class for the CartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  email: any;
  items: any;
  errorMessage: string;
  data: any = {};
  totalAmount: any;
  phone: any;
  address: any;
  constructor(public navCtrl: NavController,public loading: LoadingController,public http: Http, public navParams: NavParams, private storage: Storage, public rest: RestProvider, private toastCtrl: ToastController) {
    storage.get('email').then((val) => {
      this.email = val;

    });
    storage.get('phone').then((val) => {
      this.phone = val;
    });
    storage.get('address').then((val) => {
      this.address = val;
    });

  }

  ionViewDidLoad() {
    let loader = this.loading.create({
      content : 'Getting cart...',
    });

    loader.present().then(() => {
      this.getCart();
      this.getTotal();


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

  removeItem(item) {
    this.storage.get('email').then((val) => {
      var link = 'https://fastandfresh.org/api/updateQuantity.php';
      var cartdata = JSON.stringify({ops: 'remove',email: this.email,itemId: item.item_id, itemName: item.item_name, quantity: 1, price: item.price});
      console.log(cartdata);
      this.http.post(link, cartdata)
        .subscribe(data => {
          this.data.status = data["_body"];
          let toast = this.toastCtrl.create({
            message: this.data.status,
            duration: 3000,
            position: 'bottom'
          });
          this.getCart();
          this.getTotal();
          toast.present();
          console.log(this.data.status);
        }, error => {

          let toast = this.toastCtrl.create({
            message: this.data.status,
            duration: 3000,
            position: 'bottom'
          });
          toast.present();
        });

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
  addItem(item) {
    this.storage.get('email').then((val) => {
      var link = 'https://fastandfresh.org/api/updateQuantity.php';
      var cartdata = JSON.stringify({ops: 'add',email: this.email,itemId: item.item_id, itemName: item.item_name, quantity: 1, price: item.price});
      console.log(cartdata);
      this.http.post(link, cartdata)
        .subscribe(data => {
          this.data.status = data["_body"];
          let toast = this.toastCtrl.create({
            message: this.data.status,
            duration: 3000,
            position: 'bottom'
          });
          this.getCart();
          this.getTotal();
          toast.present();
          console.log(this.data.status);
        }, error => {

          let toast = this.toastCtrl.create({
            message: this.data.status,
            duration: 3000,
            position: 'bottom'
          });
          toast.present();
        });

    });
  }
  checkOut() {
    /*console.log("Items");
    console.log(this.items);
    console.log(this.totalAmount);
    console.log("email " + this.email);
    console.log("phone " + this.phone);
    console.log("address " + this.address);
    //for(let item in this.items) {
      //this.addToOrder(item,this.phone,this.address);
    //}
    var link = 'https://fastandfresh.org/api/order.php';
    //var link = 'http://localhost/server/freshnfast/checkout.php';
    var cartdata = JSON.stringify({email: this.email});
    console.log(cartdata);*/
    console.log('c:'+this.email+'c:'+this.phone);
    var link = 'https://fastandfresh.org/api/otpGen.php';
    var emailid = JSON.stringify({email: this.email, phone: this.phone});
    this.http.post(link, emailid)
      .subscribe(data => {
        this.data.status = data["_body"];
        let toast = this.toastCtrl.create({
          message: this.data.status,
          duration: 4000,
          position: 'bottom'
        });

        toast.present();
        console.log('api called'+this.data.status);
        this.navCtrl.push('CheckoutPage');
      }, error => {
        let toast = this.toastCtrl.create({
          message: this.data.status,
          duration: 4000,
          position: 'bottom'
        });
        toast.present();
        console.log('api called, err:'+this.data.status);
      });

    /*this.http.post(link, cartdata)
      .subscribe(data => {
        this.data.status = data["_body"];
        let toast = this.toastCtrl.create({
          message: this.data.status,
          duration: 4000,
          position: 'bottom'
        });
        this.getCart();
        this.getTotal();
        toast.present();
        console.log(this.data.status);
      }, error => {

        let toast = this.toastCtrl.create({
          message: this.data.status,
          duration: 4000,
          position: 'bottom'
        });
        toast.present();
      });*/

  }
  addToOrder(item,phone,address) {
    var link = 'https://fastandfresh.org/api/addToOrder.php';
    var d = new Date().toDateString;
    var cartdata = JSON.stringify({email: this.email,phone: phone, address: address, item: item.item_id, quantity: item.quantity, price: item.price, status: "ordered",date:d});
    console.log(cartdata);
    this.http.post(link, cartdata)
      .subscribe(data => {
        this.data.status = data["_body"];
        let toast = this.toastCtrl.create({
          message: this.data.status,
          duration: 4000,
          position: 'bottom'
        });
        this.getCart();
        this.getTotal();
        toast.present();
        console.log(this.data.status);
      }, error => {

        let toast = this.toastCtrl.create({
          message: this.data.status,
          duration: 4000,
          position: 'bottom'
        });
        toast.present();
      });
  }

}
