import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MusicianPageRoutingModule } from './musician-routing.module';

import { MusicianPage } from './musician.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MusicianPageRoutingModule
  ],
  declarations: [MusicianPage]
})
export class MusicianPageModule {}
