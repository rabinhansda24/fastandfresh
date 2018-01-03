import { Component } from '@angular/core';
import {LoadingController, NavController} from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import {RestProvider} from "../../providers/rest/rest";
import { Storage } from '@ionic/storage';
import {CartPage} from "../cart/cart";
import {SplashScreen} from "@ionic-native/splash-screen";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  splash = true;
  cartn: any;
  url:string;
  categories: any;
  errorMessage: string;
  constructor(public navCtrl: NavController,public loading: LoadingController,private splashScreen: SplashScreen,public storage: Storage, public rest: RestProvider) {
    this.url = 'https://fastandfresh.org/';
  }


  @ViewChild(Slides) slides: Slides;

  goToSlides() {
    this.slides.slideTo(2,500);
  }
  ionViewDidLoad() {
    let loader = this.loading.create({
      content : 'Getting your location...',

    });
    loader.present().then(() => {
      this.getCategories();
      this.getCount();

    });
    loader.dismiss();

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
  getCategories() {
    this.rest.getCategories()
      .subscribe(
        categories => this.categories = categories,
        error => this.errorMessage = <any>error
      );

  }
  showCart() {
    this.navCtrl.push('CartPage');
  }
  getMenus(cid, type, category) {
    if(type == 'veg') {
      this.navCtrl.push('VegItemPage',{categoryId:cid, category: category});
    } else {
      this.navCtrl.push('NonvegItemPage',{categoryId:cid, category: category});
    }

  }

}
