import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Login } from '../models/login';
import { ToastController } from '@ionic/angular';
import { NewUser } from '../models/new-user';
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';
import { concatMap } from 'rxjs/operators';

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
    this.newUser = new NewUser(this.name, this.email, this.password, this.confPassword);
    console.log(this.name);
    this.registerUser = new Login(this.name, this.password, this.email);
    this.authService.newUser(this.newUser).pipe(concatMap(newRes => this.authService.loginUser(this.registerUser))).subscribe(
      data => {
        this.tokenService.setToken(data['data'].token);
        this.isLogged = true;
        this.toastColor = 'success';
        this.presentToast('cuenta creada');
        this.router.navigate(['/event-list']);
      },
      err => {
        this.toastColor = 'danger';
        this.presentToast(err.error.message);
      }
    );
  }
  async presentToast(mss: string) {
    const toast = await this.toastController.create({
      message: mss,
      duration: 2500,
      position: 'middle',
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

}
