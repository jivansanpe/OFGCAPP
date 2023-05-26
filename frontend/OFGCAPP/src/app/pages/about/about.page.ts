import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {
  logoUrl: string;
  constructor( private platform: Platform) { }

  ngOnInit() {
    this.platform.ready().then(() => {
      this.detectDarkMode();
    });
  }

  detectDarkMode() {
    const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.logoUrl = isDarkMode ? 'assets/images/logo_sin_fondo_2_dark.png' : 'assets/images/logo_sin_fondo_2.png';
  }
}
