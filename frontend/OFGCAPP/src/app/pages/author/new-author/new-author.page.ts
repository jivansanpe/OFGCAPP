import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Author } from '../../../models/author';
import { PieceService } from '../../../services/piece.service';
import { EventsService } from '../../../services/events.service';
import { AuthorService } from '../../../services/author.service';
import { TokenService } from '../../../services/token.service';
import { ToastController } from '@ionic/angular';
import { PhotoService } from '../../../services/photo.service';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-new-author',
  templateUrl: './new-author.page.html',
  styleUrls: ['./new-author.page.scss'],
})
export class NewAuthorPage {


  constructor(
    private router: Router, private sanitizer: DomSanitizer, private photoService: PhotoService,
    private pieceService: PieceService, private tokenService: TokenService, private eventsService: EventsService,
    private authorService: AuthorService, private toastController: ToastController) { }

  ionViewWillEnter() {

  }
}
