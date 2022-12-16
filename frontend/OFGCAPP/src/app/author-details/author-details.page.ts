import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TokenService } from '../services/token.service';

import { AuthorService } from '../services/author.service';
@Component({
  selector: 'app-author-details',
  templateUrl: './author-details.page.html',
  styleUrls: ['./author-details.page.scss'],
})
export class AuthorDetailsPage implements OnInit {

  author: any;
  id: any;
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private tokenService: TokenService, private authorService: AuthorService) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id')
  }
  ngOnInit(): void {
    this.getAuthor(this.id);
  }
  getAuthor(id: any) {
    this.authorService.getAuthor(id).subscribe(response => {
      this.author = response;
      this.author = this.author['data'];
      console.log(this.author);

    });
  }
  goToHome() {
    this.router.navigateByUrl("/home");
  }
  logOut(): void {
    this.tokenService.logOut();
    this.router.navigateByUrl("/home");
  }
}
