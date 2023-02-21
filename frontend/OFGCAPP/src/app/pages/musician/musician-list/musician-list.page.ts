import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MusicianService } from '../../../services/musician.service';
import { TokenService } from '../../../services/token.service';
import { ToastController } from '@ionic/angular';
const TOKEN_KEY = 'api_token';
@Component({
  selector: 'app-musician-list',
  templateUrl: './musician-list.page.html',
  styleUrls: ['./musician-list.page.scss'],
})
export class MusicianListPage {
  musicians: any = [];
  toastColor: string;
  isLoggedIn: any;
  filterTerm: string;
  constructor(private router: Router, private tokenService: TokenService, private musicianService: MusicianService, private toastController: ToastController) { }
  goToMusician(id: any) {
    this.router.navigateByUrl(`/musician/${id}`);
  }
  goToHome() {
    this.router.navigateByUrl("/event-list");
  }
  ionViewWillEnter() {
    this.isLogged();
    this.getAllAuthors();
  }
  getAllAuthors() {
    this.musicianService.getMusicians().subscribe(response => {
      this.musicians = response;
      this.musicians = this.musicians['data'];
      console.log(this.musicians);
    });
  }
  createMusician() {
    this.router.navigateByUrl("new-musician");
  }
  updateMusician(id: any) {
    this.router.navigateByUrl(`/update-musician/${id}`);
  }
  deleteMusician(id: any) {
    this.musicianService.deleteMusician(id).subscribe(
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
  isLogged() {
    if (window.sessionStorage.getItem(TOKEN_KEY)) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  }
  goToPage(path: any) {
    this.router.navigateByUrl("/" + path);
  }
}
