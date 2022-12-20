import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MusicianService } from '../../services/musician.service';
import { EventsService } from '../../services/events.service';
import { PieceService } from '../../services/piece.service';
import { AuthorService } from '../../services/author.service';
import { ToastController } from '@ionic/angular';

const TOKEN_KEY = 'api_token';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() element: any;
  @Input() type: string;
  isLoggedIn: any;
  toastColor: string;
  constructor(private router: Router, private eventsService: EventsService, private musicianService: MusicianService,
    private pieceService: PieceService, private authorService: AuthorService, private toastController: ToastController) { }

  ngOnInit() {
    this.isLogged();
  }

  goToOne(id: any) {
    this.router.navigateByUrl(`/${this.type}-details/${id}`);
  }
  goToUpdate(id: any, event: any) {
    event.stopPropagation();
    this.router.navigateByUrl(`/update-${this.type}/${id}`);
  }
  deleteElement(id: any, event: any) {
    event.stopPropagation();
    if (this.type == "event") {
      this.eventsService.deleteEvent(id).subscribe(
        data => {
          this.toastColor = 'success'
          this.presentToast(data.message);
          window.location.reload();
        },
        err => {
          this.toastColor = 'danger'
          this.presentToast(err.error.message);
        }
      )
    }
    if (this.type == "musician") {
      this.musicianService.deleteMusician(id).subscribe(
        data => {
          this.toastColor = 'success'
          this.presentToast(data.message);
          window.location.reload();
        },
        err => {
          this.toastColor = 'danger'
          this.presentToast(err.error.message);
        }
      )
    }
    if (this.type == "author") {
      this.authorService.deleteAuthor(id).subscribe(
        data => {
          this.toastColor = 'success'
          this.presentToast(data.message);
          window.location.reload();
        },
        err => {
          this.toastColor = 'danger'
          this.presentToast(err.error.message);
        }
      )
    }
    if (this.type == "piece") {
      this.pieceService.deletePiece(id).subscribe(
        data => {
          this.toastColor = 'success'
          this.presentToast(data.message);
          window.location.reload();
        },
        err => {
          this.toastColor = 'danger'
          this.presentToast(err.error.message);
        }
      )
    }
  }
  isLogged() {
    if (window.sessionStorage.getItem(TOKEN_KEY)) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  }
  async presentToast(msj: string) {
    const toast = await this.toastController.create({
      message: msj,
      duration: 2000,
      position: 'bottom',
      color: this.toastColor,
      icon: "alert-circle-outline",
      animated: true
    });
    toast.present();
  }
}
