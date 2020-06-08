import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SmsSignupPage } from './sms-signup.page';

const routes: Routes = [
  {
    path: '',
    component: SmsSignupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SmsSignupPageRoutingModule {}
