import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewMusicianPageRoutingModule } from './new-musician-routing.module';

import { NewMusicianPage } from './new-musician.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewMusicianPageRoutingModule
  ],
  declarations: [NewMusicianPage]
})
export class NewMusicianPageModule {}
