import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Noti } from '../../../models/noti';
import { PieceService } from '../../../services/piece.service';
import { EventsService } from '../../../services/events.service';
import { AuthorService } from '../../../services/author.service';
import { NotiService } from '../../../services/noti.service';
import { TokenService } from '../../../services/token.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-update-noti',
  templateUrl: './update-noti.page.html',
  styleUrls: ['./update-noti.page.scss'],
})
export class UpdateNotiPage implements OnInit {
  newNoti: Noti;
  name = '';
  mensaje = '';
  toastColor: string;
  token: any;
  noti: any;
  id: any;
  constructor(private router: Router, private pieceService: PieceService, private activatedRoute: ActivatedRoute, private tokenService: TokenService, private eventsService: EventsService,
    private notiService: NotiService, private toastController: ToastController) { this.id = this.activatedRoute.snapshot.paramMap.get('id') }

  ionViewWillEnter() {

  }
  ngOnInit(): void {
    this.getNoti(this.id);
  }
  goToHome() {
    this.router.navigateByUrl("/event-list");
  }
  getNoti(id: any) {
    this.notiService.getNoti(id).subscribe(response => {
      this.noti = response;
      this.noti = this.noti['data'];
      this.name = this.noti.name;
      this.mensaje = this.noti.mensaje;
      console.log(this.noti);

    });
  }
  onUpdate() {
    if (this.name.trim() == '') {
      this.toastColor = 'danger'
      this.presentToast('Please fill name field');
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
    // this.notiService.updateNoti(this.id, this.newNoti).subscribe(
    //   data => {
    //     this.toastColor = 'success'
    //     this.presentToast(data.message);
    //     this.router.navigate(['/noti-list']);
    //   },
    //   err => {
    //     this.toastColor = 'danger'
    //     if (err.status == 404) {
    //       this.presentToast(err.error.message);
    //     } else {
    //       this.presentToast("Can not connect to server")
    //     }
    //   }
    // )
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
