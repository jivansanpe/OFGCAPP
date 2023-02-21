import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Piece } from '../../../models/piece';
import { PieceService } from '../../../services/piece.service';
import { EventsService } from '../../../services/events.service';
import { AuthorService } from '../../../services/author.service';
import { TokenService } from '../../../services/token.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-new-piece',
  templateUrl: './new-piece.page.html',
  styleUrls: ['./new-piece.page.scss'],
})
export class NewPiecePage {
  events: any = [];
  authors: any = [];
  newPiece: Piece;
  authorId = '';
  eventId = '';
  name = '';
  description = '';
  toastColor: string;
  token: any;
  constructor(private router: Router, private pieceService: PieceService, private tokenService: TokenService, private eventsService: EventsService, private authorService: AuthorService, private toastController: ToastController) { }

}
