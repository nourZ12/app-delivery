import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SmsSignupPageRoutingModule } from './sms-signup-routing.module';

import { SmsSignupPage } from './sms-signup.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SmsSignupPageRoutingModule
  ],
  declarations: [SmsSignupPage]
})
export class SmsSignupPageModule {}
