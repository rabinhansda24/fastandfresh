import { Component } from '@angular/core';
import {AlertController, NavController, ToastController} from 'ionic-angular';
import {SignupPage} from "../signup/signup";
import {Http} from "@angular/http";
import { Storage } from '@ionic/storage';
import { ProfilePage } from  '../../pages/profile/profile';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  data: any = {};
  user: any = {};

  constructor(public navCtrl: NavController, private toastCtrl: ToastController, public http: Http, public alertCtrl: AlertController, public storage: Storage) {
    this.data.email = '';
    this.data.password = '';
    this.user.email = '';
    this.user.name = '';
    this.data.status = '';
  }

  register() {
    this.navCtrl.push(SignupPage);
  }
  logmein() {
    var link = 'https://fastandfresh.org/api/login.php';
    var loginRequest = JSON.stringify({email: this.data.email, password: this.data.password});
    console.log(loginRequest);
    this.http.post(link, loginRequest)
      .subscribe(data => {
        this.data.status = data["_body"];

        var userData = JSON.parse(this.data.status);
        this.user = userData.data;
        console.log('user'+this.user);
        if(this.user != -1) {
          this.storage.set('email',this.user[0].email);
          this.storage.set('name',this.user[0].name);
          this.storage.set('phone',this.user[0].phone);
          this.storage.set('address', this.user[0].address);
          console.log(this.user[0].email);
          this.navCtrl.setRoot('ProfilePage');
        } else {
          let alert = this.alertCtrl.create({
            title: 'Login failed',
            subTitle: 'Please check your credentials!!!',
            buttons: ['OK']
          });
          alert.present();
        }


      }, error => {
        let toast = this.toastCtrl.create({
          message: this.data.status,
          duration: 3000,
          position: 'bottom'
        });

      });
  }

}
