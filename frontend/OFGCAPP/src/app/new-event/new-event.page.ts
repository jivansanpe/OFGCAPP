import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Event } from '../models/event';
import { MusicianInEvent } from '../models/musicianInEvent';
import { MusicianService } from '../services/musician.service';
import { EventsService } from '../services/events.service';
import { AuthorService } from '../services/author.service';
import { TokenService } from '../services/token.service';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.page.html',
  styleUrls: ['./new-event.page.scss'],
})
export class NewEventPage {
  musiciansList: any = [];
  musiciansToAssign: any = [];
  authors: any = [];
  newEvent: Event;
  authorId = '';
  eventId = '';
  name = '';
  description = '';
  date = '';
  category = '';
  toastColor: string;
  token: any;
  constructor(private router: Router, private musicianService: MusicianService, private tokenService: TokenService, private eventsService: EventsService, private authorService: AuthorService, private toastController: ToastController) { }

  ionViewWillEnter() {
    this.getAllMusicians();
  }
  getAllMusicians() {
    this.musicianService.getMusicians().subscribe(response => {
      this.musiciansList = response;
      this.musiciansList = this.musiciansList['data'];
    });
  }
  onCreate() {
    if (!this.date.match(/^\d{4}-\d{2}-\d{2}$/)) {
      this.toastColor = 'danger'
      this.presentToast('Invalid date format');
      return;
    }
    if (this.name == '' || this.description == '' || this.date == '' || this.category == '') {
      this.toastColor = 'danger'
      this.presentToast('Please fill all fields');
      return;
    }
    this.newEvent = new Event(this.name, this.description, this.date, this.category);
    this.eventsService.createEvent(this.newEvent).subscribe(
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
}
