import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app-signup',
  templateUrl: 'signup.component.html'
})
export class SignupComponent implements OnInit {

  constructor(router:Router) {}

  ngOnInit() {
  }

  signup() {
    console.log("Signing up");
  }
}
