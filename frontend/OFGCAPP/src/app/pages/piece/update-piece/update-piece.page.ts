import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Piece } from '../../../models/piece';
import { PieceService } from '../../../services/piece.service';
import { EventsService } from '../../../services/events.service';
import { AuthorService } from '../../../services/author.service';
import { TokenService } from '../../../services/token.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-update-piece',
  templateUrl: './update-piece.page.html',
  styleUrls: ['./update-piece.page.scss'],
})
export class UpdatePiecePage implements OnInit {
  newPiece: Piece;
  name = '';
  description = '';
  authorId = '';
  eventId = '';
  toastColor: string;
  token: any;
  piece: any;
  id: any;
  constructor(private router: Router, private pieceService: PieceService, private activatedRoute: ActivatedRoute, private tokenService: TokenService, private eventsService: EventsService,
    private toastController: ToastController) { this.id = this.activatedRoute.snapshot.paramMap.get('id') }

  ionViewWillEnter() {

  }
  ngOnInit(): void {
    this.getPiece(this.id);
  }
  goToHome() {
    this.router.navigateByUrl("/piece-list");
  }
  getPiece(id: any) {
    this.pieceService.getPiece(id).subscribe(response => {
      this.piece = response;
      this.piece = this.piece['data'];
      this.name = this.piece.name;
      this.description = this.piece.description;
      this.authorId = this.piece.author.id;
      this.eventId = this.piece.event.id;
      console.log(this.piece);

    });
  }
  onUpdate() {
    if (this.name.trim() == '' || this.description.trim() == '' || this.authorId == '' || this.eventId == '') {
      this.toastColor = 'danger'
      this.presentToast('Please fill all fields');
      return;
    }

    if (this.name.length > 50) {
      this.toastColor = 'danger'
      this.presentToast('The name of the piece can not be longer than 50 characters.');
      return;
    }

    if (this.description.length > 100) {
      this.toastColor = 'danger'
      this.presentToast('The description of the piece can not be longer than 100 characters.');
      return;
    }

    this.newPiece = new Piece(this.authorId, this.eventId, this.name, this.description);
    this.pieceService.updatePiece(this.id, this.newPiece).subscribe(
      data => {
        this.toastColor = 'success'
        this.presentToast(data.message);
        this.router.navigate(['/piece-list']);
      },
      err => {
        this.toastColor = 'danger'
        if (err.status == 404) {
          this.presentToast(err.error.message);
        } else {
          this.presentToast("Can not connect to server")
        }
      }
    )
  }
  async presentToast(msj: string) {
    const toast = await this.toastController.create({
      message: msj,
      duration: 2500,
      position: 'top',
      color: this.toastColor,
      icon: "alert-circle-outline",
      animated: true
    });
    toast.present();
  }
  logOut(): void {
    this.tokenService.logOut();
    this.router.navigateByUrl("/home");
  }
}
