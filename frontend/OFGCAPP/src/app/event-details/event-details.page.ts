import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { EventsService } from '../services/events.service';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.page.html',
  styleUrls: ['./event-details.page.scss'],
})
export class EventDetailsPage implements OnInit {
  event: any;
  id: any;
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private eventsService: EventsService, private tokenService: TokenService) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id')
  }
  ngOnInit(): void {

  }
  ionViewWillEnter() {
    this.getEvent(this.id);
  }
  getEvent(id: any) {
    this.eventsService.getEvent(id).subscribe(response => {
      this.event = response;
      this.event = this.event['data'];
      console.log(this.event);

    });
  }
  goToMusician(id: any) {
    this.router.navigateByUrl(`/musician/${id}`);
  }
  goToAuthor(id: any) {
    this.router.navigateByUrl(`/author-details/${id}`);
  }
  goToHome() {
    this.router.navigateByUrl("/home");
  }
  logOut(): void {
    this.tokenService.logOut();
    this.router.navigateByUrl("/home");
  }
}
