import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PieceService } from '../../../services/piece.service';
import { TokenService } from '../../../services/token.service';
import { ToastController } from '@ionic/angular';
const TOKEN_KEY = 'api_token';
@Component({
  selector: 'app-piece-list',
  templateUrl: './piece-list.page.html',
  styleUrls: ['./piece-list.page.scss'],
})
export class PieceListPage {
  pieces: any = [];
  toastColor: string;
  isLoggedIn: any;
  filterTerm: string;

  constructor(private router: Router, private tokenService: TokenService, private pieceService: PieceService, private toastController: ToastController) { }
  goToPiece(id: any) {
    this.router.navigateByUrl(`/piece-details/${id}`);
  }
  goToHome() {
    this.router.navigateByUrl("/event-list");
  }
  ionViewWillEnter() {
    this.isLogged();
    this.getAllAuthors();
  }
  getAllAuthors() {
    this.pieceService.getPieces().subscribe(response => {
      this.pieces = response;
      this.pieces = this.pieces['data'];
      console.log(this.pieces);
    });
  }
  createPiece() {
    this.router.navigateByUrl("new-piece");
  }
  updatePiece(id: any) {
    this.router.navigateByUrl(`/update-piece/${id}`);
  }
  deletePiece(id: any) {
    this.pieceService.deletePiece(id).subscribe(
      data => {
        this.toastColor = 'success'
        this.presentToast(data.message);
        this.router.navigate(['/piece-list']);
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
}
