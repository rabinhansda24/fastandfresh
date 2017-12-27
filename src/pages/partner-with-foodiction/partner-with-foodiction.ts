import { Component } from '@angular/core';
import {AlertController, NavController} from 'ionic-angular';
import {Http} from "@angular/http";
import {RestProvider} from "../../providers/rest/rest";
import { Storage } from '@ionic/storage';
import {CartPage} from "../cart/cart";

@Component({
  selector: 'page-partner-with-foodiction',
  templateUrl: 'partner-with-foodiction.html'
})
export class PartnerWithFOODICTIONPage {

  data: any = {};
  cartn: any;
  errorMessage: string;
  constructor(public navCtrl: NavController, public http: Http, public storage: Storage, public alertCtrl: AlertController, public rest: RestProvider) {
    this.data.propritor = '';
    this.data.restaurant = '';
    this.data.email = '';
    this.data.contact = '';
    this.data.city = '';
    this.data.category = '';
    this.data.address = '';
    this.data.website = '';

    this.data.status='';

    this.http = http;

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

  submit() {
    var link = 'https://fastandfresh.org/api/add_partner.php';
    var tiffinRequest = JSON.stringify({propritorName: this.data.propritor, restaurant: this.data.restaurant, email: this.data.email, contact: this.data.contact, city: this.data.city, restaurantCategory: this.data.category, address: this.data.address, website: this.data.website});

    this.http.post(link, tiffinRequest)
      .subscribe(data => {
        this.data.status = data["_body"];
        let alert = this.alertCtrl.create({
          title: 'Tiffin Service',
          subTitle: this.data.status,
          buttons: ['OK']
        });
        alert.present();
      }, error => {

        let alert = this.alertCtrl.create({
          title: 'Tiffin Service',
          subTitle: 'Something went wrong!!!',
          buttons: ['OK']
        });
        alert.present();
      });
  }

}
