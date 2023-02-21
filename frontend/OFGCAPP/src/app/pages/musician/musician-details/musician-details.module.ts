import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MusicianDetailsPageRoutingModule } from './musician-details-routing.module';

import { MusicianDetailsPage } from './musician-details.page';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MusicianDetailsPageRoutingModule,
    ComponentsModule
  ],
  declarations: [MusicianDetailsPage]
})
export class MusicianPageModule { }
