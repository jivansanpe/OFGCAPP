import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common'
import { TokenService } from '../../services/token.service';
const TOKEN_KEY = 'api_token';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  isLoggedIn: any;
  activeList = '';
  constructor(private router: Router, private tokenService: TokenService, private location: Location) { }

  ngOnInit() {
    this.isLogged();
    this.setActive();
  }
  goToPage(path: any) {
    this.activeList = path;
    this.router.navigateByUrl("/" + path);
  }
  logOut(): void {
    this.tokenService.logOut();
    this.router.navigateByUrl("/home");
  }
  isLogged() {
    if (window.sessionStorage.getItem(TOKEN_KEY)) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  }
  setActive() {
    if (this.router.url.includes('event-list')) {
      this.activeList = 'event-list';
    }
    if (this.router.url.includes('musician-list')) {
      this.activeList = 'musician-list';
    }
    if (this.router.url.includes('author-list')) {
      this.activeList = 'author-list';
    }
    if (this.router.url.includes('piece-list')) {
      this.activeList = 'piece-list';
    }
  }
}
