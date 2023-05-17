import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotiService } from '../../../services/noti.service';
import { TokenService } from '../../../services/token.service';
import { ToastController } from '@ionic/angular';
const TOKEN_KEY = 'api_token';
@Component({
  selector: 'app-noti-list',
  templateUrl: './noti-list.page.html',
  styleUrls: ['./noti-list.page.scss'],
})
export class NotiListPage {
  notis: any = [];
  toastColor: string;
  isLoggedIn: any;
  filterTerm: string;
  constructor(private router: Router, private tokenService: TokenService, private notiService: NotiService, private toastController: ToastController) { }
  goToNoti(id: any) {
    this.router.navigateByUrl(`/noti/${id}`);
  }
  goToHome() {
    this.router.navigateByUrl("/event-list");
  }
  ionViewWillEnter() {
    this.isLogged();
    this.getAllAuthors();
  }
  getAllAuthors() {
    this.notiService.getNotis().subscribe(response => {
      this.notis = response;
      this.notis = this.notis['data'];
      console.log(this.notis);
    });
  }
  createNoti() {
    this.router.navigateByUrl("new-noti");
  }
  updateNoti(id: any) {
    this.router.navigateByUrl(`/update-noti/${id}`);
  }
  deleteNoti(id: any) {
    this.notiService.deleteNoti(id).subscribe(
      data => {
        this.toastColor = 'success'
        this.presentToast(data.message);
        this.router.navigate(['/noti-list']);
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
