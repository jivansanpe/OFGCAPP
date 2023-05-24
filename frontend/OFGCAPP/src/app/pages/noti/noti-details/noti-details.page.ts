import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TokenService } from '../../../services/token.service';
import { NotiService } from '../../../services/noti.service';

@Component({
  selector: 'app-noti-details',
  templateUrl: './noti-details.page.html',
  styleUrls: ['./noti-details.page.scss'],
})
export class NotiDetailsPage implements OnInit {

  noti: any;
  id: any;
  isLoggedIn: any;
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private tokenService: TokenService, private notiService: NotiService) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id')
  }
  ngOnInit(): void {
    this.getNoti(this.id);
  }
  getNoti(id: any) {
    this.notiService.getNoti(id).subscribe(response => {
      this.noti = response;
      this.noti = this.noti['data'];
      console.log(this.noti);

    });
  }
  goToHome() {
    this.router.navigateByUrl("/event-list");
  }
  logOut(): void {
    this.tokenService.logOut();
    this.router.navigateByUrl("/home");
  }
}
