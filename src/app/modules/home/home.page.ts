import { Component } from '@angular/core';
import {AuthenticationService} from '../../core/authentication/auth';
import {Router} from '@angular/router';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public auth: AuthenticationService, public router: Router, public navCtrl: NavController) {}

  signUp(email, password, name) {
    this.auth.RegisterUser(email.value, password.value)
        .then((res) => {
          if (res.user){
              res.user.updateProfile({
                  displayName: name.value
              });
              console.log(res.user);
              this.router.navigate(['/hello']);
          }
        }).catch((error) => {
          window.alert((error.message));
        });
  }
    goToRegisterPage(){
      this.navCtrl.navigateForward('/login');
    }
    goToSMS() {
        this.navCtrl.navigateForward('/sms-signup');
    }

}
