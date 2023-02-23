import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorService } from '../../../services/author.service';
import { TokenService } from '../../../services/token.service';
import { ToastController } from '@ionic/angular';
const TOKEN_KEY = 'api_token';
@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.page.html',
  styleUrls: ['./author-list.page.scss'],
})
export class AuthorListPage {
  authors: any = [];
  toastColor: string;
  isLoggedIn: any;
  filterTerm: string;
  newArray: any[];
  constructor(private router: Router, private tokenService: TokenService, private authorService: AuthorService, private toastController: ToastController) { 
    
  }
  goToAuthor(id: any) {
    this.router.navigateByUrl(`/author-details/${id}`);
  }
  goToHome() {
    this.router.navigateByUrl("/event-list");
  }
  ionViewWillEnter() {
    this.isLogged();
    this.getAllAuthors();
  }
  getAllAuthors() {
    this.authorService.getAuthors().subscribe(response => {
      this.authors = response;
      this.authors = this.authors['data'];
<<<<<<< HEAD:frontend/OFGCAPP/src/app/pages/author/author-list/author-list.page.ts
=======


      // this.authors.forEach((element: any) =>
      //   this.newArray[element.name] = 1
      // );
      // console.log(this.newArray);
      console.log(this.authors);
>>>>>>> 36871623874a7f6b79d36a1a1a5bdf71cf1a5563:frontend/OFGCAPP/src/app/author-list/author-list.page.ts
    });
  }
  createAuthor() {
    this.router.navigateByUrl("new-author");
  }
  updateAuthor(id: any) {
    this.router.navigateByUrl(`/update-author/${id}`);
  }
  deleteAuthor(id: any) {
    this.authorService.deleteAuthor(id).subscribe(
      data => {
        this.toastColor = 'success'
        this.presentToast(data.message);
        this.router.navigate(['/author-list']);
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
