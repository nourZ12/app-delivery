import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import {AlertController, NavController} from '@ionic/angular';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-sms-signup',
  templateUrl: './sms-signup.page.html',
  styleUrls: ['./sms-signup.page.scss'],
})
export class SmsSignupPage implements OnInit {


  public recaptchaVerifier: firebase.auth.RecaptchaVerifier;
  phoneNumber: number;
  name: any;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public auth: AngularFireAuth) {
  }

  ionViewDidEnter() {
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
  }

  ngOnInit(): void {
  }

  signIn(phoneNumber: number, name) {
    const appVerifier = this.recaptchaVerifier;
    const phoneNumberString = '+' + phoneNumber;
    const provider = new firebase.auth.PhoneAuthProvider();
    firebase.auth().signInWithPhoneNumber(phoneNumberString, appVerifier)
        .then(confirmationResult => {
          // SMS sent. Prompt user to type the code from the message, then sign the
          // user in with confirmationResult.confirm(code).
          // @ts-ignore

          this.presentAlert(confirmationResult, name);
        })
        .catch(error => {
          console.error('SMS not sent', error);
        });

  }

  async presentAlert(confirmationResult, name) {
    // @ts-ignore
    const prompt = await this.alertCtrl.create({
      inputs: [{name: 'confirmationCode', placeholder: 'Confirmation Code'}],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Send',
          handler: data => {
            confirmationResult.confirm(data.confirmationCode)
                .then(result => {
                  console.log(result.user);
                  // User signed in successfully.
                  result.user.updateProfile({
                    displayName: name
                  });
                  this.navCtrl.navigateForward('/hello');
                }).catch(error => {
              // User couldn't sign in (bad verification code?)
              // ...
            });
          }
        }
      ]
    });
    await prompt.present();
  }
  goToRegisterPage() {
    this.navCtrl.navigateForward('/home');
  }
}
