import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.page.html',
  styleUrls: ['./event-details.page.scss'],
})
export class EventDetailsPage {

  constructor(private router: Router) { }
  goToMusician() {
    this.router.navigateByUrl("/musician");
  }
  goToAuthor() {
    this.router.navigateByUrl("/author-details");
  }
  goToHome() {
    this.router.navigateByUrl("/home");
  }

}
