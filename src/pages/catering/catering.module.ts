import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CateringPage } from './catering';

@NgModule({
  declarations: [
    CateringPage,
  ],
  imports: [
    IonicPageModule.forChild(CateringPage),
  ],
  exports: [
    CateringPage
  ]
})
export class CateringPageModule {}
