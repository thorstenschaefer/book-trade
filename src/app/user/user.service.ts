import { Injectable } from '@angular/core';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable, FirebaseAuthState, AuthProviders, AuthMethods } from 'angularfire2';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/share';
import 'rxjs/add/observable/of';

import { User } from './user';

const LOGIN_CONFIG = { provider: AuthProviders.Password, method: AuthMethods.Password };

@Injectable()
export class UserService {

  private users: FirebaseObjectObservable<any>;  
  
  public user: Observable<User>;
  public loggedIn: Observable<boolean>;

  constructor(private af:AngularFire) {
    this.user = this.af.auth.flatMap(auth => auth === null ? Observable.of(null) : this.af.object('/users/' + auth.uid));
    this.loggedIn = this.user.map(user => user !== null);   
    
    // debug
    this.af.auth.subscribe(auth => console.warn("DEBUG US: auth changed to id " + (auth ? auth.uid : null)));
    this.user.subscribe(u => console.warn("DEBUG US: user change " + u));
    this.loggedIn.subscribe(s => console.warn("DEBUG US: loggedIn state now " + s));

  }
    
  login(email:string, password:string) {
    console.log("Login called");
    return this.af.auth.login({ email:email, password:password }, LOGIN_CONFIG);
  }
  
 logout():void {
    console.log("Logout called");
    this.af.auth.logout();
  }
    
  
  updateUserData(user: User) {
    console.log("Updating user information " + JSON.stringify(user));
    let userData = this.af.object('/users/' + user.id);
    userData.update({ 'city':user.city, 'state':user.state });
  }
  
  signup(user:User) {
    console.log("user.service: SIGNUP " + JSON.stringify(user));
    let promise = this.af.auth.createUser(user).then(
      newUser => {
        console.log("new user created, storing it in the users collection");
        let userId = newUser.uid;
        user.id = userId;
        this.af.auth.login(user).then(
          auth => {
            let object = {};
            delete user.password;
            object[userId] = user;
            this.users.update( object );
          }
        )
      }
    ).catch(e => console.warn(e));
    
    return promise;
  }
}
