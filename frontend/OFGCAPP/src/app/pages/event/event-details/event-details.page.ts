import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Piece } from  '../../../models/piece'
import { EventsService } from '../../../services/events.service';
import { PieceService } from '../../../services/piece.service';
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
  matchingPieceIds: Piece[] = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private eventsService: EventsService,
    private pieceService: PieceService,
    private tokenService: TokenService
  ) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.getEvent(this.id);
    this.getAllPieces();
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
    this.eventsService.getEvent(id).subscribe((response) => {
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
    this.router.navigateByUrl('/event-list');
  }

  goToPage(path: any) {
    this.router.navigateByUrl('/' + path);
  }

  createPiece() {
    this.router.navigateByUrl('new-piece');
  }

  logOut(): void {
    this.tokenService.logOut();
    this.router.navigateByUrl('/home');
  }
  
  getAllPieces() {
    this.pieceService.getPieces().subscribe((response: any) => {
      const data = response['data'];
      console.log(data); // Puedes hacer lo que necesites con las piezas obtenidas
      
      const pieces: Piece[] = data.map((item: any) => {
        // Verificar si el campo author_id está presente y no es undefined
        
        return new Piece(
          item.author_id,
          item.selectedEventIds,
          item.name,
          item.description
        );
      });
  
      this.checkMatchingPieceIds(pieces);
    });
  }
  
  checkMatchingPieceIds(pieces: Piece[]) {
    this.matchingPieceIds = pieces
      .filter((piece) => {
        return piece.selectedEventIds.includes(this.id);
      })
      .map((piece) => {
        return piece;
      });
  
    console.log(this.matchingPieceIds);
  }
  
  
  
}
