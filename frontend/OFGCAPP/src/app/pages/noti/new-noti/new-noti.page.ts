import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Noti } from '../../../models/noti';
import { NotiService } from '../../../services/noti.service';
import { TokenService } from '../../../services/token.service';
import { ToastController } from '@ionic/angular';
import { Location } from '@angular/common';

@Component({
  selector: 'app-new-noti',
  templateUrl: './new-noti.page.html',
  styleUrls: ['./new-noti.page.scss'],
})
export class NewNotiPage {
  newNoti: Noti;
  name = '';
  mensaje = '';
  toastColor: string;
  token: any;
  constructor(private router: Router, private notiService: NotiService, private tokenService: TokenService, private toastController: ToastController, private location: Location) { }

  ionViewWillEnter() {
    
  }
  goToHome() {
    this.router.navigateByUrl("/event-list");
  }
  onCreate() {
    if (this.name.trim() == '') {
      this.toastColor = 'danger'
      this.presentToast('Please fill name field.');
      return;
    }

    if (this.name.length > 50) {
      this.toastColor = 'danger'
      this.presentToast('The name of the noti can not be longer than 50 characters.');
      return;
    }

    if (this.mensaje.length > 100) {
      this.toastColor = 'danger'
      this.presentToast('The mensaje of the noti can not be longer than 100 characters.');
      return;
    }

    this.newNoti = new Noti(this.name, this.mensaje);
    this.token = this.tokenService.getToken();
    this.notiService.createNoti(this.newNoti).subscribe(
      data => {
        this.toastColor = 'success'
        this.presentToast(data.message);
        this.location.back();
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
