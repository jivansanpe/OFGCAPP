import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TokenService } from '../services/token.service';
import { PieceService } from '../services/piece.service';

@Component({
  selector: 'app-piece-details',
  templateUrl: './piece-details.page.html',
  styleUrls: ['./piece-details.page.scss'],
})
export class PieceDetailsPage implements OnInit {

  piece: any;
  id: any;
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private tokenService: TokenService, private pieceService: PieceService) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id')
  }
  ngOnInit(): void {
    this.getPiece(this.id);
  }
  getPiece(id: any) {
    this.pieceService.getPiece(id).subscribe(response => {
      this.piece = response;
      this.piece = this.piece['data'];
      console.log(this.piece);

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
