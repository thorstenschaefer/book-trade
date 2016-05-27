import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css'],
  directives: [ROUTER_DIRECTIVES]  
})
export class HeaderComponent implements OnInit {

  constructor(private router:Router, private userService:UserService) {}

  ngOnInit() {
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/']);
  }

  login(email:string, password:string) {
    let promise = this.userService.login(email, password);
    // after successful login, redirect to user page
    promise.then(value => {
      console.log("PROMISE.THEN");
      console.log(value);
      this.router.navigate(['/user']);//, 'user', value.password.email]);
    }).catch(reason => alert(reason));
  }

}
