import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { EventsService } from '../../../services/events.service';
import { TokenService } from '../../../services/token.service';

const TOKEN_KEY = 'api_token';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.page.html',
  styleUrls: ['./event-details.page.scss'],
})
export class EventDetailsPage implements OnInit {
  event: any;
  id: any;
  isLoggedIn: boolean;
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private eventsService: EventsService, private tokenService: TokenService) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id')
  }
  ngOnInit(): void {
    this.getEvent(this.id);
  }
  ionViewWillEnter() {
    this.isLogged();
    this.getEvent(this.id);
  }
  isLogged() {
    if (window.sessionStorage.getItem(TOKEN_KEY)) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  }  
  getEvent(id: any) {
    this.eventsService.getEvent(id).subscribe(response => {
      this.event = response;
      this.event = this.event['data'];
      console.log(this.event);
    });
  }
  goToMusician(id: any) {
    this.router.navigateByUrl(`/musician-details/${id}`);
  }
  goToAuthor(id: any) {
    this.router.navigateByUrl(`/author-details/${id}`);
  }
  goToHome() {
    this.router.navigateByUrl("/event-list");
  }
  goToPage(path: any) {
    this.router.navigateByUrl("/" + path);
  }
  createPiece() {
    this.router.navigateByUrl("new-piece");
  }
  logOut(): void {
    this.tokenService.logOut();
    this.router.navigateByUrl("/home");
  }
}
