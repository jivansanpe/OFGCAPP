import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Author } from '../models/author';
import { PieceService } from '../services/piece.service';
import { EventsService } from '../services/events.service';
import { AuthorService } from '../services/author.service';
import { TokenService } from '../services/token.service';
import { ToastController } from '@ionic/angular';

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
  constructor(private router: Router, private pieceService: PieceService, private activatedRoute: ActivatedRoute, private tokenService: TokenService, private eventsService: EventsService, private authorService: AuthorService, private toastController: ToastController) { this.id = this.activatedRoute.snapshot.paramMap.get('id') }

  ionViewWillEnter() {

  }
  ngOnInit(): void {
    this.getAuthor(this.id);
  }
  goToHome() {
    this.router.navigateByUrl("/event-list");
  }
  getAuthor(id: any) {
    this.authorService.getAuthor(id).subscribe(response => {
      this.author = response;
      this.author = this.author['data'];
      this.name = this.author.name;
      this.description = this.author.description;
      console.log(this.author);

    });
  }
  onUpdate() {
    if (this.name == '' || this.description == '') {
      this.toastColor = 'danger'
      this.presentToast('Please fill all fields');
      return;
    }
    this.newAuthor = new Author(this.name, this.description);
    this.authorService.updateAuthor(this.id, this.newAuthor).subscribe(
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
