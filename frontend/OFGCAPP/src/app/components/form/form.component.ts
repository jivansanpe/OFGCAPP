import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Author } from '../../models/author';
import { Event } from '../../models/event';
import { Musician } from '../../models/musician';
import { Piece } from '../../models/piece';
import { PieceService } from '../../services/piece.service';
import { EventsService } from '../../services/events.service';
import { AuthorService } from '../../services/author.service';
import { MusicianService } from '../../services/musician.service';
import { TokenService } from '../../services/token.service';
import { ToastController } from '@ionic/angular';
import { PhotoService } from '../../services/photo.service';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  newElement: any;
  id: any;
  author: any;
  musician: any;
  event: any;
  piece: any;
  authors: any = [];
  events: any = [];
  musicians: any = [];
  authorId: any;
  eventId: any;
  musicianId: any;
  name = '';
  description = '';
  date = '';
  category = '';
  toastColor: string;
  token: any;
  image: any = null;
  imageDisplayed: any = null;
  @Input() type: string;
  @Input() page: string;
  constructor(private router: Router, private sanitizer: DomSanitizer, private photoService: PhotoService,
    private pieceService: PieceService, private tokenService: TokenService, private eventsService: EventsService,
    private activatedRoute: ActivatedRoute, private musicianService: MusicianService, private authorService: AuthorService, private toastController: ToastController) { }
  ngOnInit() {
    console.log(this.imageDisplayed)
    if (this.page == 'Create' && this.type == 'Piece') {
      this.getAllEvents();
      this.getAllAuthors();
    }
    if (this.page == 'Create' && this.type == 'Event') {
      this.getAllMusicians();
    }
    
    if (this.page == 'Update') {
      this.id = this.activatedRoute.snapshot.paramMap.get('id')
      switch (this.type) {
        case 'Piece': {
          this.getPiece(this.id);
          break;
        }
        case 'Author': {
          this.getAuthor(this.id);
          break;
        }
        case 'Musician': {
          this.getMusician(this.id);
          break;
        }
        case 'Event': {
          this.getEvent(this.id);
          break;
        }
      };
    }

  }
  getAllEvents() {
    console.log('owo');
    this.eventsService.getEvents().subscribe(response => {
      this.events = response;
      this.events = this.events['data'];
    });
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
  getMusician(id: any) {
    this.musicianService.getMusician(id).subscribe(response => {
      this.musician = response;
      this.musician = this.musician['data'];
      this.name = this.musician.name;
      this.description = this.musician.description;
      console.log(this.musician);

    });
  }
  getAllMusicians() {
    this.musicianService.getMusicians().subscribe(response => {
      this.musicians = response;
      this.musicians = this.musicians['data'];
    });
  }
  getPiece(id: any) {
    this.pieceService.getPiece(id).subscribe(response => {
      this.piece = response;
      this.piece = this.piece['data'];
      this.name = this.piece.name;
      this.description = this.piece.description;
      this.authorId = this.piece.author.id;
      this.eventId = this.piece.event.id;
      console.log(this.piece);
    });
  }
  getAuthor(id: any) {
    this.authorService.getAuthor(id).subscribe(response => {
      this.author = response;
      this.author = this.author['data'];
      this.name = this.author.name;
      this.description = this.author.description;
      this.image = this.author.image;
      console.log(this.author);

    });
  }
  getAllAuthors() {
    this.authorService.getAuthors().subscribe(response => {
      this.authors = response;
      this.authors = this.authors['data'];
    });
  }
  pickImage() {
    this.photoService.pickImage().then(data => {
      this.image = data.webPath;
      this.imageDisplayed = this.sanitizer.bypassSecurityTrustUrl(this.image);
    });
  }

  discardImage() {
    this.image = null;
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
  async onCreate() {
    if (this.name == '' || this.description == '') {
      this.toastColor = 'danger'
      this.presentToast('Please fill all fields');
      return;
    }
    if (this.name.length > 50) {
      this.toastColor = 'danger'
      this.presentToast('The name can not be longer than 50 characters.');
      return;
    }

    if (this.description.length > 100) {
      this.toastColor = 'danger'
      this.presentToast('The description can not be longer than 100 characters.');
      return;
    }
    if (this.image == null && this.type != 'Piece') {
      this.toastColor = 'danger'
      this.presentToast('Please add an image.');
      return;
    }
    let blob: any;
    if (this.type != 'Piece' && this.image != null) {
      const response = await fetch(this.image);
      blob = await response.blob();
    }

    switch (this.type) {
      case 'Piece': {
        this.newElement = new Piece(this.authorId, this.eventId, this.name, this.description);
        this.pieceService.createPiece(this.newElement).subscribe(
          data => {
            this.toastColor = 'success'
            console.log(data.message);
            this.presentToast(data.message);
            this.router.navigate([`/${this.type.toLowerCase()}-list`]);
          },
          err => {
            this.toastColor = 'danger'
            console.log(this.newElement);
            if (err.status == 404) {
              this.presentToast(err.error.message);
            } else {
              this.presentToast(err.error.message);
            }
          }
        )
        break;
      }
      case 'Author': {
        this.newElement = new Author(this.name, this.description);
        this.authorService.createAuthor(this.newElement, blob).subscribe(
          data => {
            this.toastColor = 'success'
            this.presentToast(data.message);
            this.router.navigate([`/${this.type.toLowerCase()}-list`]);
          },
          err => {
            this.toastColor = 'danger'
            console.log(this.newElement);
            if (err.status == 404) {
              this.presentToast(err.error.message);
            } else {
              this.presentToast(err.error.message);
            }
          }
        )
        break;
      }
      case 'Musician': {
        this.newElement = new Musician(this.name, this.description);
        this.musicianService.createMusician(this.newElement, blob).subscribe(
          data => {
            this.toastColor = 'success'
            this.presentToast(data.message);
            this.router.navigate([`/${this.type.toLowerCase()}-list`]);
          },
          err => {
            this.toastColor = 'danger'
            console.log(this.newElement);
            if (err.status == 404) {
              this.presentToast(err.error.message);
            } else {
              this.presentToast(err.error.message);
            }
          }
        )
        break;
      }
      case 'Event': {
        this.newElement = new Event(this.name, this.description, this.date, this.category);
        this.eventsService.createEvent(this.newElement, blob).subscribe(
          data => {
            this.toastColor = 'success'
            this.presentToast(data.message);
            this.router.navigate([`/${this.type.toLowerCase()}-list`]);
          },
          err => {
            this.toastColor = 'danger'
            console.log(this.newElement);
            if (err.status == 404) {
              this.presentToast(err.error.message);
            } else {
              this.presentToast(err.error.message);
            }
          }
        )
        break;
      }
    }

  }
  async onUpdate() {
    if (this.name == '' || this.description == '') {
      this.toastColor = 'danger'
      this.presentToast('Please fill all fields');
      return;
    }
    let blob: any;
    if (this.type != 'Piece' && this.imageDisplayed != null) {
      const response = await fetch(this.image);
      blob = await response.blob();
    }
    switch (this.type) {
      case 'Piece': {
        this.newElement = new Piece(this.authorId, this.eventId, this.name, this.description);
        this.pieceService.updatePiece(this.id, this.newElement).subscribe(
          data => {
            this.toastColor = 'success'
            this.presentToast(data.message);
            this.router.navigate([`/${this.type.toLowerCase()}-list`]);
          },
          err => {
            this.toastColor = 'danger'
            console.log(this.newElement);
            if (err.status == 404) {
              this.presentToast(err.error.message);
            } else {
              this.presentToast(err.error.message);
            }
          }
        )
        break;
      }
      case 'Author': {
        this.newElement = new Author(this.name, this.description);
        this.authorService.updateAuthor(this.id, this.newElement, blob).subscribe(
          data => {
            this.toastColor = 'success'
            console.log(data.message);
            this.presentToast(data.message);
            this.router.navigate([`/${this.type.toLowerCase()}-list`]);
          },
          err => {
            this.toastColor = 'danger'
            console.log(err);
            if (err.status == 404) {
              this.presentToast(err.error.message);
            } else {
              this.presentToast(err.error.message);
            }
          }
        )
        break;
      }
      case 'Musician': {
        this.newElement = new Musician(this.name, this.description);
        this.musicianService.updateMusician(this.id, this.newElement, blob).subscribe(
          data => {
            this.toastColor = 'success'
            this.presentToast(data.message);
            this.router.navigate([`/${this.type.toLowerCase()}-list`]);
          },
          err => {
            this.toastColor = 'danger'
            console.log(this.newElement);
            if (err.status == 404) {
              this.presentToast(err.error.message);
            } else {
              this.presentToast(err.error.message);
            }
          }
        )
        break;
      }
      case 'Event': {
        this.newElement = new Event(this.name, this.description, this.date, this.category);
        this.eventsService.updateEvent(this.id, this.newElement, blob).subscribe(
          data => {
            this.toastColor = 'success'
            console.log(data.message);
            this.presentToast(data.message);
            this.router.navigate([`/${this.type.toLowerCase()}-list`]);
          },
          err => {
            this.toastColor = 'danger'
            console.log(err);
            if (err.status == 404) {
              this.presentToast(err.error.message);
            } else {
              this.presentToast(err.error.message);
            }
          }
        )
        break;
      }
    }
  }

}
