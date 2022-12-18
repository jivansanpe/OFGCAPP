import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TokenService } from '../services/token.service';
import { MusicianService } from '../services/musician.service';

@Component({
  selector: 'app-musician-details',
  templateUrl: './musician-details.page.html',
  styleUrls: ['./musician-details.page.scss'],
})
export class MusicianDetailsPage implements OnInit {

  musician: any;
  id: any;
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private tokenService: TokenService, private musicianService: MusicianService) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id')
  }
  ngOnInit(): void {
    this.getMusician(this.id);
  }
  getMusician(id: any) {
    this.musicianService.getMusician(id).subscribe(response => {
      this.musician = response;
      this.musician = this.musician['data'];
      console.log(this.musician);

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
