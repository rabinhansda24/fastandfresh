import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {RestProvider} from "../../providers/rest/rest";
import { Storage } from '@ionic/storage';
import { LoginPage } from  '../login/login';
import {Http} from "@angular/http";
import {CartPage} from "../cart/cart";

/**
 * Generated class for the NonvegItemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-nonveg-item',
  templateUrl: 'nonveg-item.html',
})
export class NonvegItemPage {

  cid: string = '';
  items: any;
  errorMessage: string;
  category: any;
  n: any;
  email: any;
  status: any;
  data: any = {};
  cartn: any;
  url:string;
  constructor(public navCtrl: NavController,public loading: LoadingController,public http: Http, public navParams: NavParams, public rest: RestProvider, public storage: Storage, private toastCtrl: ToastController) {
    this.cid = navParams.get('categoryId');
    this.category = navParams.get('category');
    this.n = 0;
    storage.get('email').then((val) => {
      this.email = val;
    });
    this.url = 'https://fastandfresh.org/';
  }

  ionViewDidLoad() {
    let loader = this.loading.create({

      content : 'Getting ' + this.category + '...',
    });
    loader.present().then(() => {
      this.getNonVegItems();
      this.getCount();
      setTimeout(() => {
        loader.dismiss();
      }, 2000);
    });


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

  getNonVegItems() {
    this.rest.getNonvegItems(this.cid)
      .subscribe(
        items => this.items = items,
        error => this.errorMessage = <any>error
      );
  }
  addToCart(item) {
    if(this.email){

      var link = 'https://fastandfresh.org/api/addToCart.php';
      var cartdata = JSON.stringify({email: this.email,itemId: item.itemid, itemName: item.item_name, quantity: 1, price: item.price});
      console.log(cartdata);
      this.http.post(link, cartdata)
        .subscribe(data => {
          this.data.status = data["_body"];
          let toast = this.toastCtrl.create({
            message: this.data.status,
            duration: 3000,
            position: 'bottom'
          });
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

    } else {
      this.navCtrl.push(LoginPage);
    }

  }

  showCart() {
    this.navCtrl.push('CartPage');
  }

}
