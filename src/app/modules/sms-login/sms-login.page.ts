import {Component, OnInit} from '@angular/core';
import {AlertController, NavController} from '@ionic/angular';
import * as firebase from 'firebase';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
    selector: 'app-sms-login',
    templateUrl: './sms-login.page.html',
    styleUrls: ['./sms-login.page.scss'],
})
export class SmsLoginPage implements OnInit {

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

    signIn(phoneNumber: number,) {
        const appVerifier = this.recaptchaVerifier;
        const phoneNumberString = '+' + phoneNumber;
        const provider = new firebase.auth.PhoneAuthProvider();
        firebase.auth().signInWithPhoneNumber(phoneNumberString, appVerifier)
            .then(confirmationResult => {
                // SMS sent. Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).

                this.presentAlert(confirmationResult);
            })
            .catch(error => {
                console.error('SMS not sent', error);
            });

    }

    async presentAlert(confirmationResult) {
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
    goToLogin() {
        this.navCtrl.navigateForward('/login');
    }
}
