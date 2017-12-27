import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {Http} from "@angular/http";
import {RestProvider} from "../../providers/rest/rest";
import { Storage } from '@ionic/storage';
import {CartPage} from "../cart/cart";

/**
 * Generated class for the CateringPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-catering',
  templateUrl: 'catering.html',
})
export class CateringPage {
  data: any = {};
  cartn: any;
  errorMessage: string;
  constructor(public navCtrl: NavController,public storage: Storage, public rest: RestProvider, public navParams: NavParams, public http: Http, public alertCtrl: AlertController) {
    this.data.date = new Date();
    this.data.time = new Date();

    this.data.name = '';
    this.data.email = '';
    this.data.phone = '';
    this.data.numofpeople = '';
    this.data.foodtype = '';
    this.data.venue = '';
    this.data.items = '';



  }

  ionViewDidLoad() {

    this.getCount();

  }
  showCart() {
    this.navCtrl.push('CartPage');
  }

  submit() {
    var link = 'https://fastandfresh.org/api/book_catering.php';
    var tiffinRequest = JSON.stringify({name: this.data.name, email: this.data.email,phone: this.data.phone, numofpeople: this.data.numofpeople, foodtype: this.data.foodtype, venue: this.data.venue, items: this.data.items, date: this.data.date, time: this.data.time});

    this.http.post(link, tiffinRequest)
      .subscribe(data => {
        this.data.status = data["_body"];
        let alert = this.alertCtrl.create({
          title: 'Book Catering',
          subTitle: this.data.status,
          buttons: ['OK']
        });
        alert.present();
      }, error => {

        let alert = this.alertCtrl.create({
          title: 'Book Catering',
          subTitle: 'Something went wrong!!!',
          buttons: ['OK']
        });
        alert.present();
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


}
