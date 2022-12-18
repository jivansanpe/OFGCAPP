import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Musician } from '../models/musician';
import { PieceService } from '../services/piece.service';
import { EventsService } from '../services/events.service';
import { AuthorService } from '../services/author.service';
import { MusicianService } from '../services/musician.service';
import { TokenService } from '../services/token.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-update-musician',
  templateUrl: './update-musician.page.html',
  styleUrls: ['./update-musician.page.scss'],
})
export class UpdateMusicianPage implements OnInit {
  newMusician: Musician;
  name = '';
  description = '';
  toastColor: string;
  token: any;
  musician: any;
  id: any;
  constructor(private router: Router, private pieceService: PieceService, private activatedRoute: ActivatedRoute, private tokenService: TokenService, private eventsService: EventsService,
    private musicianService: MusicianService, private toastController: ToastController) { this.id = this.activatedRoute.snapshot.paramMap.get('id') }

  ionViewWillEnter() {

  }
  ngOnInit(): void {
    this.getMusician(this.id);
  }
  goToHome() {
    this.router.navigateByUrl("/event-list");
  }
  getMusician(id: any) {
    this.musicianService.getMusician(id).subscribe(response => {
      this.musician = response;
      this.musician = this.musician['data'];
      this.name = this.musician.name;
      this.description = this.musician.description;
      console.log(this.musician);

    });
  }
  onUpdate() {
    this.newMusician = new Musician(this.name, this.description);
    this.musicianService.updateMusician(this.id, this.newMusician).subscribe(
      data => {
        this.toastColor = 'success'
        this.presentToast(data.message);
        this.router.navigate(['/musician-list']);
      },
      err => {
        this.toastColor = 'danger'
        this.presentToast(err.error.message);
      }
    )
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
  logOut(): void {
    this.tokenService.logOut();
    this.router.navigateByUrl("/home");
  }
}
