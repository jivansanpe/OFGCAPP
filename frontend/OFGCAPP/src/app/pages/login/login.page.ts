import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Login } from '../../models/login';
import { ToastController } from '@ionic/angular';

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
  constructor(private tokenService: TokenService, private toastController: ToastController, private authService: AuthService, private router: Router, public formBuilder: FormBuilder) { }
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
    this.loginUser = new Login(this.email, this.password,);
    this.authService.loginUser(this.loginUser).subscribe(
      data => {
        this.isLogged = true;
        this.tokenService.setToken(data['data'].token);
        this.router.navigate(['/event-list']);
      },
      err => {
        if (err.status == 404) {
          this.presentToast("Incorrect email or password");
        } else {
          this.presentToast("Can not connect to server")
        }
      }
    )
  }
  async presentToast(mss: string) {
    const toast = await this.toastController.create({
      message: mss,
      duration: 2800,
      position: 'middle',
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
