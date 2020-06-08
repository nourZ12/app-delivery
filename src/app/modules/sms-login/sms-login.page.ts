import { Component, OnInit } from '@angular/core';
import {AlertController, NavController} from '@ionic/angular';
import * as firebase from 'firebase';

@Component({
  selector: 'app-sms-login',
  templateUrl: './sms-login.page.html',
  styleUrls: ['./sms-login.page.scss'],
})
export class SmsLoginPage implements OnInit {

  public recaptchaVerifier: firebase.auth.RecaptchaVerifier;
  constructor(public navCtrl: NavController, public alertCtrl: AlertController) {}

  ionViewDidEnter() {
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
  }

  ngOnInit(): void {
  }

  signIn(phoneNumber: number){
    const appVerifier = this.recaptchaVerifier;
    const phoneNumberString = '+' + phoneNumber;
    firebase.auth().signInWithPhoneNumber(phoneNumberString, appVerifier)
        .then( confirmationResult => {
          // SMS sent. Prompt user to type the code from the message, then sign the
          // user in with confirmationResult.confirm(code).
          // @ts-ignore
this.presentAlert(confirmationResult);
        })
        .catch(error => {
          console.error('SMS not sent', error);
        });

  }
  async presentAlert(confirmationResult){
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
                  // User signed in successfully.
                  this.navCtrl.navigateForward('/hello')
                  console.log(result.user);
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
}
