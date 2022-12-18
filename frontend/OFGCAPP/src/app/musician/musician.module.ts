import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MusicianPageRoutingModule } from './musician-routing.module';

import { MusicianPage } from './musician.page';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MusicianPageRoutingModule,
    ComponentsModule
  ],
  declarations: [MusicianPage]
})
export class MusicianPageModule { }
