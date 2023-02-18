import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Piece } from '../models/piece';
import { PieceService } from '../services/piece.service';
import { EventsService } from '../services/events.service';
import { AuthorService } from '../services/author.service';
import { TokenService } from '../services/token.service';
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

  ionViewWillEnter() {
    this.getAllEvents();
    this.getAllAuthors();
  }
  goToHome() {
    this.router.navigateByUrl("/event-list");
  }
  getAllEvents() {
    this.eventsService.getEvents().subscribe(response => {
      this.events = response;
      this.events = this.events['data'];
    });
  }
  getAllAuthors() {
    this.authorService.getAuthors().subscribe(response => {
      this.authors = response;
      this.authors = this.authors['data'];
    });
  }
  onCreate() {
    if (this.name.trim() == '' || this.description == '' || this.authorId == '' || this.eventId == '') {
      this.toastColor = 'danger'
      this.presentToast('Please fill all fields.');
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

    console.log(this.authorId)
    console.log(this.eventId)
    this.newPiece = new Piece(this.authorId, this.eventId, this.name, this.description);
    this.token = this.tokenService.getToken();
    this.pieceService.createPiece(this.newPiece, this.token).subscribe(
      data => {
        this.toastColor = 'success'
        this.presentToast(data.message);
        this.router.navigate(['/piece-list']);
      },
      err => {
        this.toastColor = 'danger'
        if (err.status == 404) {
          this.presentToast(err.error.message);
        }
        if (err.status == 500) {
          this.presentToast("Server error");
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
