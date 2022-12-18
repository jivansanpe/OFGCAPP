import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateMusicianPageRoutingModule } from './update-musician-routing.module';

import { UpdateMusicianPage } from './update-musician.page';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateMusicianPageRoutingModule,
    ComponentsModule
  ],
  declarations: [UpdateMusicianPage]
})
export class UpdateMusicianPageModule { }
