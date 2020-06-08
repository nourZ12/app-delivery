import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AuthenticationService} from '../../core/authentication/auth';
import {NavController} from '@ionic/angular';

@Component({
    selector: 'app-hello',
    templateUrl: './hello.page.html',
    styleUrls: ['./hello.page.scss'],
})
export class HelloPage implements OnInit {
    userEmail;
    hasVerifiedEmail = true;

    constructor(public authService: AuthenticationService, public navCtrl: NavController, public aFire: AngularFireAuth) {
        this.aFire.authState.subscribe(res => {
            if (res) {
                this.aFire.currentUser.then(user => {
                    console.log(user.emailVerified);
                    this.hasVerifiedEmail = user.emailVerified;
                });
            }
        });
    }

    ngOnInit() {
        this.authService.isLoggedIn();
        this.authService.userDetails().subscribe(res => {
            console.log('res', res);
            if (res !== null) {
                this.userEmail = res.email;
            } else {
                this.navCtrl.navigateBack('');
            }
        }, err => {
            console.log('err', err);
        });
    }

    logout() {
        this.authService.signOut()
            .then(res => {
                console.log(res);
            })
            .catch(error => {
                console.log(error);
            });
    }

    sendVerificationEmail() {
        this.aFire.currentUser.then(user => {
            user.sendEmailVerification();
        });
    }
}
