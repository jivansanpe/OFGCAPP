import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.page.html',
  styleUrls: ['./event-list.page.scss'],
})
export class EventListPage {

  constructor(private router: Router) { }
  goToEvent() {
    this.router.navigateByUrl("/event-details");
  }

}
