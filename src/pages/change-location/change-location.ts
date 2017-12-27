import { Component, ViewChild, ElementRef } from '@angular/core';
import {LoadingController, NavController} from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMaps, GoogleMap } from '@ionic-native/google-maps';


declare var google;


@Component({
  selector: 'page-change-location',
  templateUrl: 'change-location.html'
})
export class ChangeLocationPage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  public lat;
  public lan;
  constructor(public navCtrl: NavController,public loading: LoadingController, public geolocation: Geolocation, public loadingCtrl: LoadingController) {
  }
  presentLoadingCustom() {
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: `
      <div class="">
        <div class=""><img src="assets/imgs/giphy.gif"></div>
      </div>`,
      duration: 5000
    });
    loading.present();
  }


  ionViewDidLoad() {
    let loader = this.loading.create({
      content : 'Getting your location...',

    });

    loader.present().then(() => {
      this.loadMap()
      setTimeout(() => {
        loader.dismiss();
      }, 3000);

    });
    ;
  }
  loadMap() {

    this.geolocation.getCurrentPosition({enableHighAccuracy: true,  maximumAge: 0}).then((position) => {

      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      this.lat = position.coords.latitude;
      this.lan = position.coords.longitude;
      let mapOptions = {
        center: latLng,
        zoom: 17,
        timeout:5000,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        myLocationButton: true
      }

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      let marker = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        position: this.map.getCenter()
      });

    }, (err) => {
      console.log(err);
    });

  }




  updateLocation() {
    console.log(this.lat);
    console.log(this.lan);
  }


}
