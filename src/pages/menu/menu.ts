import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import { RestProvider } from  '../../providers/rest/rest';
import { NonvegItemPage } from '../nonveg-item/nonveg-item';
import { VegItemPage } from '../veg-item/veg-item';
import { Storage } from '@ionic/storage';
import {CartPage} from "../cart/cart";

/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  categories: any;
  errorMessage: string;
  cartn: any;
  url:string;
  constructor(public navCtrl: NavController,public loading: LoadingController,public storage: Storage, public navParams: NavParams, public rest: RestProvider) {
    this.url = 'https://fastandfresh.org/';
  }

  ionViewDidLoad() {
    let loader = this.loading.create({
      content : 'Getting menu...',
    });

    loader.present().then(() => {
      this.getCategories();
      this.getCount();
    });
    loader.dismiss();


  }

  getCategories() {
    this.rest.getCategories()
      .subscribe(
        categories => this.categories = categories,
        error => this.errorMessage = <any>error
      );

  }
  getMenus(cid, type, category) {
    if(type == 'veg') {
      this.navCtrl.push('VegItemPage',{categoryId:cid, category: category});
    } else {
      this.navCtrl.push('NonvegItemPage',{categoryId:cid, category: category});
    }

  }
  showCart() {
    this.navCtrl.push('CartPage');
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
