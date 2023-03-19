import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Login } from '../../models/login';
import { ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

import { AuthService } from '../../services/auth.service';
import { TokenService } from '../../services/token.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  isLogged = false;

  loginUser: Login;
  password = '';
  email = '';
  toastColor: string;
  constructor(public http: HttpClient, private tokenService: TokenService, private toastController: ToastController, private authService: AuthService, private router: Router, public formBuilder: FormBuilder) { }
  ngOnInit() {

  }
  goToHome() {
    this.router.navigateByUrl("/event-list");
  }
  goToRegister() {
    this.router.navigateByUrl("/register");
  }
  ionViewWillEnter() {

    this.vaciar();
  }
  onLogin(): void {

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(this.email)) {
      this.toastColor = 'danger';
      this.presentToast("Invalid email address. The email adress must have a valid format.");
      return;
    }

    const passwordRegex = /^[a-zA-Z0-9]+$/;
    if (!passwordRegex.test(this.password)) {
      this.toastColor = 'danger';
      this.presentToast("Invalid password. Passwords should only contain letters and/or digits.");
      return;
    }

    this.loginUser = new Login(this.email, btoa(this.password));
    this.authService.loginUser(this.loginUser).subscribe(
      data => {
        this.isLogged = true;
        this.tokenService.setToken(data['data'].token);
        this.router.navigate(['/event-list']);
      },
      err => {
        if (err.status == 404) {
          this.presentToast(err.message);
        } else {
          this.presentToast("Can not connect to server")
        }
      }
    )
  }
  async presentToast(mss: string) {
    const toast = await this.toastController.create({
      message: mss,
      duration: 2500,
      position: 'top',
      color: "danger",
      icon: "alert-circle-outline",
      animated: true
    });
    await toast.present();
  }
  vaciar() {
    this.password = '';
    this.email = '';
  }

  logOut(): void {
    this.tokenService.logOut();
    this.isLogged = false;
    this.vaciar();
  }

}
