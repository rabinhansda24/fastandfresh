import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import {RestProvider} from "../../providers/rest/rest";
import { Storage } from '@ionic/storage';
import {CartPage} from "../cart/cart";

@Component({
  selector: 'page-f-oddictiontiffin-services',
  templateUrl: 'f-oddictiontiffin-services.html'
})
export class FODDICTIONTiffinServicesPage {
  data:any = {};
  cartn: any;
  errorMessage: string;
  constructor(public navCtrl: NavController, public http: Http,public storage: Storage, public alertCtrl: AlertController, public rest: RestProvider) {
    this.data.name='';
    this.data.email='';
    this.data.contact='';
    this.data.address='';
    this.data.preference='';
    this.data.deliverytime='';

    this.data.status='';

    this.http = http;
  }
  ionViewDidLoad() {

    this.getCount();

  }
  submit() {
    var link = 'https://fastandfresh.org/api/tiffin_service.php';
    var tiffinRequest = JSON.stringify({name: this.data.name, email: this.data.email,contact: this.data.contact, address: this.data.address, preference: this.data.preference, deliverytime: this.data.deliverytime});

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
