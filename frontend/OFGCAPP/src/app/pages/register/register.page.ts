import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Login } from '../../models/login';
import { ToastController } from '@ionic/angular';
import { NewUser } from '../../models/new-user';
import { AuthService } from '../../services/auth.service';
import { TokenService } from '../../services/token.service';
import { concatMap } from 'rxjs/operators';
import { enc } from 'crypto-js';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {


  newUser: NewUser;
  registerUser: Login;
  name = '';
  password = '';
  confPassword = '';
  email = '';
  isLogged = false;
  toastColor: string;
  constructor(private tokenService: TokenService,
    private toastController: ToastController,
    private authService: AuthService,
    private router: Router,
    public formBuilder: FormBuilder) { }
  ngOnInit() {

  }
  goToHome() {
    this.router.navigateByUrl("/event-list");
  }
  ionViewWillEnter() {

    this.vaciar();
  }
  onRegister(): void {

    if (!this.isValidUsername(this.name)) {
      this.toastColor = 'danger';
      this.presentToast('Invalid username. Usernames should only contain letters and/or digits.');
      return;
    } else if (!this.isValidPassword(this.password)) {
      this.toastColor = 'danger';
      this.presentToast('Invalid password. Passwords should only contain letters and/or digits.');
      return;
    } else if (this.password !== this.confPassword) {
      this.toastColor = 'danger';
      this.presentToast('Password and confirm password do not match.');
      return;
    }

    const encryptedPassword = enc.Base64.stringify(enc.Utf8.parse(this.password));
    const encryptedConfPassword = enc.Base64.stringify(enc.Utf8.parse(this.confPassword));

    this.newUser = new NewUser(this.name, this.email, encryptedPassword, encryptedConfPassword);
    console.log(this.name);
    this.registerUser = new Login(this.email, encryptedPassword);
    this.authService.newUser(this.newUser).pipe(concatMap(newRes => this.authService.loginUser(this.registerUser))).subscribe(
      data => {
        this.tokenService.setToken(data['data'].token);
        this.isLogged = true;
        this.toastColor = 'success';
        this.presentToast('Created account.');
        this.router.navigate(['/event-list']);
      },
      err => {
        this.toastColor = 'danger';
        if (err.status == 404) {
          this.presentToast("Incorrect email.");
        } else {
          console.log(err.message)
          this.presentToast(err.message)
        }
      }
    );
  }
  async presentToast(mss: string) {
    const toast = await this.toastController.create({
      message: mss,
      duration: 2500,
      position: 'top',
      color: this.toastColor,
      icon: "alert-circle-outline",
      animated: true
    });
    await toast.present();
  }
  vaciar() {
    this.name = '';
    this.password = '';
    this.confPassword = '';
    this.email = '';
  }

  logOut(): void {
    this.tokenService.logOut();
    this.isLogged = false;
    this.vaciar();
  }

  isValidUsername(name: string): boolean {
    const regex = /^[a-zA-Z0-9]+$/;
    return regex.test(name);
  }

  isValidPassword(password: string): boolean {
    const regex = /^[a-zA-Z0-9]+$/;
    return regex.test(password);
  }



}
