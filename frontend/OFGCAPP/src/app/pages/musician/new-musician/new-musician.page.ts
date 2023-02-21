import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Musician } from '../../../models/musician';
import { MusicianService } from '../../../services/musician.service';
import { TokenService } from '../../../services/token.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-new-musician',
  templateUrl: './new-musician.page.html',
  styleUrls: ['./new-musician.page.scss'],
})
export class NewMusicianPage {
  newMusician: Musician;
  name = '';
  description = '';
  toastColor: string;
  token: any;
  constructor(private router: Router, private musicianService: MusicianService, private tokenService: TokenService, private toastController: ToastController) { }

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
    this.newMusician = new Musician(this.name, this.description);
    this.token = this.tokenService.getToken();
    this.musicianService.createMusician(this.newMusician, this.token).subscribe(
      data => {
        this.toastColor = 'success'
        this.presentToast(data.message);
        this.router.navigate(['/musician-list']);
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
