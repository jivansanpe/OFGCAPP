import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  logInForm: FormGroup;
  constructor(private router: Router, public formBuilder: FormBuilder) { }
  ngOnInit() {

  }
  goToHome() {
    this.router.navigateByUrl("/home");
  }


}
