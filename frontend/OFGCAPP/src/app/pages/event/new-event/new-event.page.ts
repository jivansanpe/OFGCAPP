import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Event } from '../../../models/event';
import { MusicianInEvent } from '../../../models/musicianInEvent';
import { MusicianService } from '../../../services/musician.service';
import { EventsService } from '../../../services/events.service';
import { AuthorService } from '../../../services/author.service';
import { TokenService } from '../../../services/token.service';
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

}
