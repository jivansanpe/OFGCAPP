import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Piece } from '../../../models/piece';
import { PieceService } from '../../../services/piece.service';
import { EventsService } from '../../../services/events.service';
import { AuthorService } from '../../../services/author.service';
import { TokenService } from '../../../services/token.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-update-piece',
  templateUrl: './update-piece.page.html',
  styleUrls: ['./update-piece.page.scss'],
})
export class UpdatePiecePage implements OnInit {
  newPiece: Piece;
  name = '';
  event: any;
  newElement: any;
  description = '';
  authorId = '';
  authors: any = [];
  events: any = [];
  selectedEventIds: string[] = [];
  eventId: any;
  toastColor: string;
  token: any;
  piece: any;
  id: any;
  constructor(private router: Router, private pieceService: PieceService, private authorService: AuthorService, private activatedRoute: ActivatedRoute, private tokenService: TokenService, private eventsService: EventsService,
    private toastController: ToastController) { this.id = this.activatedRoute.snapshot.paramMap.get('id') }

  ionViewWillEnter() {

  }
  ngOnInit(): void {
    this.getPiece(this.id);
    this.getAllAuthors();
    this.getAllEvents();
  }
  getAllEvents() {
    console.log('owo');
    this.eventsService.getEvents().subscribe(response => {
      this.events = response;
      this.events = this.events['data'];
    });
  }
  goToHome() {
    this.router.navigateByUrl("/piece-list");
  }
  getPiece(id: any) {
    this.pieceService.getPiece(id).subscribe(response => {
      this.piece = response;
      this.piece = this.piece['data'];
      this.name = this.piece.name;
      this.description = this.piece.description;
      this.authorId = this.piece.author.id;
      const eventIds = this.events.map((event: { id: string }) => event.id); // Obtener solo los IDs de los eventos
      
      // Crear un nuevo array con valores booleanos para el estado de las casillas de verificación
      const checkboxStatus = eventIds.map((eventId: string) => true);
      
      // Asignar los valores al array selectedEventIds
      this.selectedEventIds = checkboxStatus;
    });
  }
  





  getAllAuthors() {
    this.authorService.getAuthors().subscribe(response => {
      this.authors = response;
      this.authors = this.authors['data'];
    });
  }
  onUpdate() {
    if (this.name.trim() == '' || this.description.trim() == '' || this.authorId == '') {
      this.toastColor = 'danger';
      this.presentToast('Please fill all fields');
      return;
    }

    if (this.name.length > 50) {
      this.toastColor = 'danger';
      this.presentToast('The name of the piece cannot be longer than 50 characters.');
      return;
    }

    if (this.description.length > 100) {
      this.toastColor = 'danger';
      this.presentToast('The description of the piece cannot be longer than 100 characters.');
      return;
    }

    const selectedEventIds = this.events
    .filter((event: { id: string }, index: number) => this.selectedEventIds[index])
    .map((event: { id: string }) => event.id);

  if (selectedEventIds.length === 0) {
    this.toastColor = 'danger';
    this.presentToast('Please select at least one event');
    return;
  }

  this.newElement = new Piece(this.authorId, selectedEventIds, this.name, this.description);
  console.log(selectedEventIds);

  this.pieceService.createPiece(this.newElement).subscribe(
    data => {
      console.log(this.newElement.selectedEventIds);
      this.toastColor = 'success';
      console.log(data.message);
      this.presentToast(data.message);
  
      // Llamada al servicio deletePiece después de crear la pieza
      this.pieceService.deletePiece(this.id).subscribe(
        deleteData => {
          // Manejar la respuesta exitosa de deletePiece, si es necesario
          console.log(deleteData.message);
        },
        deleteError => {
          // Manejar el error de deletePiece, si es necesario
          console.log(deleteError.error.message);
        }
      );
  
      this.router.navigate([`/event-list`]);
    },
    err => {
      this.toastColor = 'danger';
      console.log(this.newElement);
      if (err.status == 404) {
        this.presentToast(err.error.message);
      } else {
        this.presentToast(err.error.message);
      }
    }
  );
  
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


