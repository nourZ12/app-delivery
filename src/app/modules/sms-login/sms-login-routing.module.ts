import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SmsLoginPage } from './sms-login.page';

const routes: Routes = [
  {
    path: '',
    component: SmsLoginPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SmsLoginPageRoutingModule {}
