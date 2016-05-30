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
    this.users = this.af.object('/users');
    this.user = this.af.auth.flatMap(auth => auth === null ? Observable.of(null) : this.af.object('/users/' + auth.uid));
    this.loggedIn = this.user.map(user => user !== null);
  }
    
  login(email:string, password:string) {
    // console.log("Login called");
    return this.af.auth.login({ email:email, password:password }, LOGIN_CONFIG);
  }
  
 logout():void {
    // console.log("Logout called");
    this.af.auth.logout();
  }
    
  getUser(id:string):Observable<User> {
    if (id == null)
      return Observable.of(null);
    return this.af.object('/users/' + id);
  }
  
  updateUserData(user: User) {
    // console.log("Updating user information " + JSON.stringify(user));
    let userData = this.af.object('/users/' + user.id);
    userData.update({ 'name':user.name, 'city':user.city, 'state':user.state });
  }
  
  signup(user:User):Promise<any> {
    // console.log("user.service: SIGNUP " + JSON.stringify(user));
    let promise = this.af.auth.createUser(user).then(
      newUser => {
        // console.log("new user created, storing it in the users collection");
        let userId = newUser.uid;
        user.id = userId;
        // console.warn("auth user " + JSON.stringify(user));
        this.af.auth.login(user).then(
          auth => {
            let object = {};
            delete user.password;
            object[userId] = user;
            this.users.update( object );
          }
        )
      }
    ).catch(e => console.error(e));
    
    return promise;
  }
}
