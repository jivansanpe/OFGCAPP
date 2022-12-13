import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-author-details',
  templateUrl: './author-details.page.html',
  styleUrls: ['./author-details.page.scss'],
})
export class AuthorDetailsPage {

  constructor(private router: Router) { }

  goToHome() {
    this.router.navigateByUrl("/home");
  }

}
