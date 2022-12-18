import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventsService } from '../services/events.service';
import { TokenService } from '../services/token.service';
import { ToastController } from '@ionic/angular';
import { Location } from '@angular/common'

const TOKEN_KEY = 'api_token';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.page.html',
  styleUrls: ['./event-list.page.scss'],
})
export class EventListPage {
  events: any = [];
  isLoggedIn: boolean;
  toastColor: string;
  filterTerm: string;
  constructor(private router: Router, private tokenService: TokenService, private location: Location, private toastController: ToastController, private eventsService: EventsService) { }

  goToEvent(id: any) {
    this.router.navigateByUrl(`/event-details/${id}`);
  }
  goToHome() {
    this.router.navigateByUrl("/event-list");
  }
  ionViewWillEnter() {
    this.getAllEvents();
    this.isLogged();
  }
  updateEvent(id: any) {
    this.router.navigateByUrl(`/update-event/${id}`);
  }
  getAllEvents() {
    this.eventsService.getEvents().subscribe(response => {
      this.events = response;
      this.events = this.events['data'];
      console.log(this.events);
    });
  }
  createEvent() {
    this.router.navigateByUrl("new-piece");
  }
  deleteEvent(id: any) {
    this.eventsService.deleteEvent(id).subscribe(
      data => {
        this.toastColor = 'success'
        this.presentToast(data.message);
        this.router.navigate(['/event-list']);
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
  back(): void {
    this.location.back();
  }
}
