import { Component, OnInit } from '@angular/core';
import { UserService } from '../user';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';

import { User } from '../user';

@Component({
  moduleId: module.id,
  selector: 'app-header',
  templateUrl: 'header.component.html',
  directives: [ROUTER_DIRECTIVES]  
})
export class HeaderComponent implements OnInit {

  private loggedIn:boolean;
  private user:User;
  
  constructor(private router:Router, private userService:UserService) {
    // userService.loggedIn.subscribe(v => this.loggedIn = v);
    userService.user.subscribe(v => {
      this.loggedIn = v !== null;
      this.user = v;
    });
  }

  ngOnInit() {
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/books']);
  }

  login(email:string, password:string) {
    let promise = this.userService.login(email, password);
    // after successful login, redirect to user page
    promise.then(value => {
      // console.log("login PROMISE.THEN");
      this.router.navigate(['/user/', value.uid]);//, 'user', value.password.email]);
    }).catch(reason => alert(reason));
  }

}
