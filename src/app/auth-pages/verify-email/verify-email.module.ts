import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { NgOtpInputModule } from  'ng-otp-input';
import { VerifyEmailPageRoutingModule } from './verify-email-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { VerifyEmailPage } from './verify-email.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgOtpInputModule,
    IonicModule,
    VerifyEmailPageRoutingModule,
    TranslateModule
  ],
  declarations: [VerifyEmailPage]
})
export class VerifyEmailPageModule {}
