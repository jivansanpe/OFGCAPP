import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Author } from '../../../models/author';
import { PieceService } from '../../../services/piece.service';
import { EventsService } from '../../../services/events.service';
import { AuthorService } from '../../../services/author.service';
import { TokenService } from '../../../services/token.service';
import { ToastController } from '@ionic/angular';
import { PhotoService } from '../../../services/photo.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-update-author',
  templateUrl: './update-author.page.html',
  styleUrls: ['./update-author.page.scss'],
})
export class UpdateAuthorPage implements OnInit {
  newAuthor: Author;
  name = '';
  description = '';
  toastColor: string;
  token: any;
  author: any;
  id: any;
  image: any = "";
  imageDisplayed: any;
  constructor(private router: Router, private sanitizer: DomSanitizer, private pieceService: PieceService, private photoService: PhotoService, private activatedRoute: ActivatedRoute, private tokenService: TokenService, private eventsService: EventsService, private authorService: AuthorService, private toastController: ToastController) { this.id = this.activatedRoute.snapshot.paramMap.get('id') }

  ngOnInit(): void {
    this.getAuthor(this.id);
  }
  getAuthor(id: any) {
    this.authorService.getAuthor(id).subscribe(response => {
      this.author = response;
      this.author = this.author['data'];
      this.name = this.author.name;
      this.description = this.author.description;
      this.image = this.author.image;
      console.log(this.author);

    })
  }
}
