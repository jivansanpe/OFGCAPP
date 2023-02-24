import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Event } from '../../../models/event';
import { PieceService } from '../../../services/piece.service';
import { EventsService } from '../../../services/events.service';
import { MusicianService } from '../../../services/musician.service';
import { TokenService } from '../../../services/token.service';
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
}
