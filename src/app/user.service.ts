import { Injectable } from '@angular/core';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable, FirebaseAuthState, AuthProviders, AuthMethods } from 'angularfire2';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { User } from './user';

const LOGIN_CONFIG = { provider: AuthProviders.Password, method: AuthMethods.Password };

@Injectable()
export class UserService {

  public users: FirebaseObjectObservable<any>;
  public user: Observable<User>;
  public loggedIn: Observable<boolean>;
  /**
   * currently logged in user
   */
  // public user:User;
  
  constructor(public af: AngularFire) {
    //     console.log("INIT user SERVCIE")
    // this.af.auth.subscribe(auth => console.log("auth changed to id " + auth.uid));
    this.users = af.object('/users');
    this.user = this.af.auth.flatMap(auth => auth === null ? Observable.of(null) : this.af.object('/users/' + auth.uid));
    this.loggedIn = this.user.map(user => user !== null);
  }
  
  getUser():Observable<User> {
    // console.log("getting user observable");
    // return this.af.auth.flatMap(auth => auth ? this.af.object('/users/' + auth.uid) : Observable.of(null));
 
    return this.user; 
 }
  
  // isLoggedIn(): Observable<boolean> {
  //   return this.getUser().map(userObservable => userObservable === null ? false : true);
  // }
    
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
