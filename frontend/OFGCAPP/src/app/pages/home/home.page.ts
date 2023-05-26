import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../../services/token.service';
import { Platform } from '@ionic/angular';

const TOKEN_KEY = 'api_token';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  logoUrl: string;
  organizaUrl: string;
  isLoggedIn: any;
  constructor(private router: Router, private tokenService: TokenService, private platform: Platform) { }
  ionViewWillEnter() {
    this.isLogged();
    this.platform.ready().then(() => {
      this.detectDarkMode();
    });
  }
  detectDarkMode() {
    const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.logoUrl = isDarkMode ? 'assets/images/ofgc_logo_dark_r.png' : 'assets/images/ofgc_logo_light_r.png';
    this.organizaUrl = isDarkMode ? 'assets/images/A-dark.png' : 'assets/images/A.png';
  }
  goToEventlist() {
    this.router.navigateByUrl("/event-list");
  }
  goToLogin() {
    this.router.navigateByUrl("/login");
  }
  goToAbout() {
    this.router.navigateByUrl("/about");
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
