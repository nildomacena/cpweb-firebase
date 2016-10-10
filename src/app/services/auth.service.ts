import { Injectable } from '@angular/core';
import { AngularFire, FirebaseAuthState} from 'angularfire2';
import { Observable } from 'rxjs/Observable';
declare var firebase: any;

@Injectable()
export class AuthService{
    auth: any;
    constructor(private af: AngularFire){
        this.auth = firebase.auth();
    }

    isAuthenticated(): Observable<any>{
        let user = firebase.auth().currentUser;
        return this.af.auth.asObservable();
    }

    signin(user){
        return this.af.auth.login({email: user.email, password: user.password});
    }

    signup(user){
        return this.af.auth.createUser({email: user.email, password: user.password});
    }

    logout(){
        return this.auth.signOut();
    }

    resetPassword(form){
        return this.auth.sendPasswordResetEmail(form.email);
    }
}