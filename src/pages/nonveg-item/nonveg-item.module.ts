import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NonvegItemPage } from './nonveg-item';

@NgModule({
  declarations: [
    NonvegItemPage,
  ],
  imports: [
    IonicPageModule.forChild(NonvegItemPage),
  ],
  exports: [
    NonvegItemPage
  ]
})

export class NonvegItemPageModule {}
