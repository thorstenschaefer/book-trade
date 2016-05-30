import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User, UserService } from '../user';

@Component({
  moduleId: module.id,
  selector: 'app-signup',
  templateUrl: 'signup.component.html'
})
export class SignupComponent implements OnInit {
  
  private user:User = {
    id:null,
    email: null,
    password: null,
    name: null,
    city:null,
    state:null
  };

  constructor(router:Router, private userService:UserService) {}

  ngOnInit() {
  }

  signup() {
    this.userService.signup(this.user)
  }
}
