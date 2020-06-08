import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SmsLoginPageRoutingModule } from './sms-login-routing.module';

import { SmsLoginPage } from './sms-login.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SmsLoginPageRoutingModule
  ],
  declarations: [SmsLoginPage]
})
export class SmsLoginPageModule {}
