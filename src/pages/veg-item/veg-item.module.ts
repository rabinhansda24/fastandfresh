import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VegItemPage } from './veg-item';

@NgModule({
  declarations: [
    VegItemPage,
  ],
  imports: [
    IonicPageModule.forChild(VegItemPage),
  ],
  exports: [
    VegItemPage
  ]
})
export class VegItemPageModule {}
