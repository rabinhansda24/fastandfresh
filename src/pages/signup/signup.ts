import { Component } from '@angular/core';
import {AlertController, NavController} from 'ionic-angular';
import {Http} from "@angular/http";
import { Device } from "@ionic-native/device";

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  data: any = {};
  constructor(public navCtrl: NavController, public http: Http, public alertCtrl: AlertController, private device: Device) {
    this.data.email = '';
    this.data.name = '';
    this.data.password = '';
    this.data.phone = '';
    this.data.address = '';
    this.data.landmark = '';
    this.data.deviceid = this.device.uuid;

    this.data.status='';

    this.http = http;

  }
  registerMe() {
    var link = 'https://fastandfresh.org/api/register.php';
    var tiffinRequest = JSON.stringify({name: this.data.name, email: this.data.email,phone: this.data.phone, address: this.data.address, password: this.data.password, landmark: this.data.landmark, deviceid: this.data.deviceid });

    this.http.post(link, tiffinRequest)
      .subscribe(data => {
        this.data.status = data["_body"];
        let alert = this.alertCtrl.create({
          title: 'Registration',
          subTitle: this.data.status,
          buttons: ['OK']
        });
        alert.present();
      }, error => {

        let alert = this.alertCtrl.create({
          title: 'Registration',
          subTitle: 'Something went wrong!!!',
          buttons: ['OK']
        });
        alert.present();
      });
  }

}
