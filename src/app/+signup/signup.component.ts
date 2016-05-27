import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../user.service';
import { User } from '../user';

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
    state:null,
    books:[] 
  };

  constructor(router:Router, private userService:UserService) {}

  ngOnInit() {
  }

  signup() {
    console.log("Signing up");
    this.userService.signup(this.user)
    
  }
}
