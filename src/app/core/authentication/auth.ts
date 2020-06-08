import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';

@Injectable({
    providedIn: 'root'
})

export class AuthenticationService{

    userData: any;
    constructor(public fireAuth: AngularFireAuth, public router: Router) {
        this.fireAuth.authState.subscribe( user => {
            if (user) {
                this.userData = user;
                localStorage.setItem('user', JSON.stringify(this.userData));
                JSON.parse(localStorage.getItem('user'));
            } else {
                localStorage.setItem('user', null);
                JSON.parse(localStorage.getItem('user'));
            }
        });
    }

    RegisterUser(email, password){
        return this.fireAuth.createUserWithEmailAndPassword(email, password);
    }

    userDetails(){
        return this.fireAuth.user;
    }
    loginUser(value) {
        return new Promise<any>((resolve, reject) => {
            this.fireAuth.signInWithEmailAndPassword(value.email, value.password)
                .then(
                    res => resolve(res),
                    err => reject(err));
        });
    }

    signOut() {
        return this.fireAuth.signOut().then(() => {
            localStorage.removeItem('user');
            this.router.navigate(['/login']);
        });
    }
     isLoggedIn() {
        const user = JSON.parse(localStorage.getItem('user'));
        return (user !== null && user.emailVerified !== false) ? true : false;
        }


}
