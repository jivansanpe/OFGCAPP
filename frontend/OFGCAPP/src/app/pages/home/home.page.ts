import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../../services/token.service';

const TOKEN_KEY = 'api_token';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  isLoggedIn: any;
  constructor(private router: Router, private tokenService: TokenService) { }
  ionViewWillEnter() {
    this.isLogged();
  }
  goToEventlist() {
    this.router.navigateByUrl("/event-list");
  }
  goToLogin() {
    this.router.navigateByUrl("/login");
  }
  isLogged() {
    if (window.sessionStorage.getItem(TOKEN_KEY)) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  }
  logOut(): void {
    this.tokenService.logOut();
    window.location.reload();
  }
}
