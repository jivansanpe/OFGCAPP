import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Event } from '../models/event';
import { PieceService } from '../services/piece.service';
import { EventsService } from '../services/events.service';
import { MusicianService } from '../services/musician.service';
import { TokenService } from '../services/token.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-update-event',
  templateUrl: './update-event.page.html',
  styleUrls: ['./update-event.page.scss'],
})
export class UpdateEventPage implements OnInit {
  newEvent: Event;
  name = '';
  description = '';
  date = '';
  category = '';
  toastColor: string;
  token: any;
  event: any;
  id: any;
  constructor(private router: Router, private pieceService: PieceService, private activatedRoute: ActivatedRoute, private tokenService: TokenService, private eventsService: EventsService,
    private musicianService: MusicianService, private toastController: ToastController) { this.id = this.activatedRoute.snapshot.paramMap.get('id') }

  ionViewWillEnter() {

  }
  ngOnInit(): void {
    this.getEvent(this.id);
  }
  goToHome() {
    this.router.navigateByUrl("/event-list");
  }
  getEvent(id: any) {
    this.eventsService.getEvent(id).subscribe(response => {
      this.event = response;
      this.event = this.event['data'];
      this.name = this.event.name;
      this.description = this.event.description;
      this.category = this.event.category;
      this.date = this.event.date;

    });
  }
  onUpdate() {

    if (this.name.trim() == '' || this.description.trim() == '' || this.date.trim() == '' || this.category.trim() == '') {
      this.toastColor = 'danger'
      this.presentToast('Please fill all fields.');
      return;
    }

    if (this.name.length > 50) {
      this.toastColor = 'danger'
      this.presentToast('The name of the event can not be longer than 50 characters.');
      return;
    }

    if (this.description.length > 100) {
      this.toastColor = 'danger'
      this.presentToast('The description of the event can not be longer than 100 characters.');
      return;
    }

    if (this.category.length > 50) {
      this.toastColor = 'danger'
      this.presentToast('The category of the event can not be longer than 50 characters.');
      return;
    }

    if (!this.date.match(/^\d{4}-\d{2}-\d{2}$/)) {
      this.toastColor = 'danger'
      this.presentToast('Invalid date format.');
      return;
    }

    this.newEvent = new Event(this.name, this.description, this.date, this.category);
    this.eventsService.updateEvent(this.id, this.newEvent).subscribe(
      data => {
        this.toastColor = 'success'
        this.presentToast(data.message);
        this.router.navigate(['/event-list']);
      },
      err => {
        this.toastColor = 'danger'
        if (err.status == 404) {
          this.presentToast(err.error.message);
        } else {
          this.presentToast("Can not connect to server.")
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
