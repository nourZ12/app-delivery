import { Component, OnInit } from '@angular/core';
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
  constructor(public authService: AuthenticationService, public navCtrl: NavController) { }

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
        .then( res => {
          console.log(res);
        })
        .catch(error => {
          console.log(error);
        });
  }

}
