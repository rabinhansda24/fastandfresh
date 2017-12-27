import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {RestProvider} from "../../providers/rest/rest";
import { Storage } from '@ionic/storage';
import {CartPage} from "../cart/cart";

@Component({
  selector: 'page-call',
  templateUrl: 'call.html'
})
export class CallPage {
  data: any = {};
  cartn: any;
  errorMessage: string;
  constructor(public navCtrl: NavController,public storage: Storage, public rest: RestProvider) {

  }
  ionViewDidLoad() {

    this.getCount();

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
  showCart() {
    this.navCtrl.push('CartPage');
  }

}
