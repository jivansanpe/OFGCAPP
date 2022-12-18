import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PieceDetailsPageRoutingModule } from './piece-details-routing.module';

import { PieceDetailsPage } from './piece-details.page';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PieceDetailsPageRoutingModule,
    ComponentsModule
  ],
  declarations: [PieceDetailsPage]
})
export class PieceDetailsPageModule { }
