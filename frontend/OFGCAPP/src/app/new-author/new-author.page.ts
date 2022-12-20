import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Author } from '../models/author';
import { PieceService } from '../services/piece.service';
import { EventsService } from '../services/events.service';
import { AuthorService } from '../services/author.service';
import { TokenService } from '../services/token.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-new-author',
  templateUrl: './new-author.page.html',
  styleUrls: ['./new-author.page.scss'],
})
export class NewAuthorPage {
  newAuthor: Author;
  name = '';
  description = '';
  toastColor: string;
  token: any;
  constructor(private router: Router, private pieceService: PieceService, private tokenService: TokenService, private eventsService: EventsService, private authorService: AuthorService, private toastController: ToastController) { }

  ionViewWillEnter() {

  }
  goToHome() {
    this.router.navigateByUrl("/event-list");
  }
  onCreate() {
    if (this.name == '' || this.description == '') {
      this.toastColor = 'danger'
      this.presentToast('Please fill all fields');
      return;
    }
    this.newAuthor = new Author(this.name, this.description);
    this.authorService.createAuthor(this.newAuthor).subscribe(
      data => {
        this.toastColor = 'success'
        this.presentToast(data.message);
        this.router.navigate(['/author-list']);
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
