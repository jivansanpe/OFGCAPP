import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventsService } from '../../../services/events.service';
import { TokenService } from '../../../services/token.service';
import { ToastController } from '@ionic/angular';
import { Location } from '@angular/common'
import { finalize, forkJoin } from 'rxjs';


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
    }, err => {
      this.toastColor = 'danger';
      this.presentToast("Can not connect to server")
    });
  }
  changeAllPrivateEvents() {
    if (window.confirm('¿Seguro que quieres publicar todos los eventos?')) {
      this.eventsService.changeAllEventStatusToPublic().subscribe(() => {
        console.log('Todos los eventos se han actualizado con éxito');
      }, (err) => {
        console.error('Error al actualizar eventos', err);
      });
    }
  }
  createEvent() {
    this.router.navigateByUrl("new-event");
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
  deleteAllEventsNow() {
    if (window.confirm('¿Seguro que quieres borrar todos los eventos?')) {
      const deleteRequests = this.events.map((event: { id: any; }) => {
        return this.eventsService.deleteEvent(event.id);
      });

      forkJoin(deleteRequests).pipe(
        finalize(() => {
          this.router.navigate(['/event-list']).then(() => {
            location.reload();
          });
        })
      ).subscribe(
        data => {
          console.log(`Events deleted`);
        },
        err => {
          console.log(`Error deleting events: ${err.error.message}`);
        }
      );
    }
  }


  async presentToast(msj: string) {
    const toast = await this.toastController.create({
      message: msj,
      duration: 2000,
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
