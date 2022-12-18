import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common'
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  @Input() isLogged: any;
  constructor(private router: Router, private tokenService: TokenService, private location: Location) { }

  ngOnInit() { }
  goToPage(path: any) {
    this.router.navigateByUrl("/" + path);
  }
  logOut(): void {
    this.tokenService.logOut();
    this.router.navigateByUrl("/home");
  }
}
