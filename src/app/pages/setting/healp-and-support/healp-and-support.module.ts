import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HealpAndSupportPageRoutingModule } from './healp-and-support-routing.module';

import { HealpAndSupportPage } from './healp-and-support.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HealpAndSupportPageRoutingModule
  ],
  declarations: [HealpAndSupportPage]
})
export class HealpAndSupportPageModule {}
