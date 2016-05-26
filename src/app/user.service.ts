import { Injectable } from '@angular/core';
import { AngularFire, FirebaseAuthState, AuthProviders, AuthMethods } from 'angularfire2';
import { Observable } from 'rxjs';

import { User } from './user';

const LOGIN_CONFIG = { provider: AuthProviders.Password, method: AuthMethods.Password };

@Injectable()
export class UserService {


  private user:User;
  public user$: Observable<User> = Observable.of(null);
  
  constructor(private af: AngularFire) {
    // this.af.object()
  }
  
  isLoggedIn(): Observable<boolean> {
    return this.getAuthentication().map(auth => auth !== null);
  }
  
 /** Returns an observable of string with the user ID. For non-authenticated users, this is null */
  getAuthentication(): Observable<User> {
    return this.af.auth.map(auth => 
      auth === null 
        ? null 
        : { "id" : auth.uid, "email" : auth.password.email });
  }
  
  login(email:string, password:string):Promise<FirebaseAuthState> {
    console.log("Login called");
    return this.af.auth.login({ email:email, password:password }, LOGIN_CONFIG);
  }
  
 logout() {
    console.log("Logout called");
    this.af.auth.logout();
    
  }
  
  getUserData():Observable<any> {
    return this.getAuthentication()
      .map(user => user.id)
      .flatMap(userId => this.af.list('users/' + userId));
  }
}
