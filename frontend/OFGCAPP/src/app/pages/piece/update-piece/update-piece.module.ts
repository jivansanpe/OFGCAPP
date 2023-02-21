import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdatePiecePageRoutingModule } from './update-piece-routing.module';

import { UpdatePiecePage } from './update-piece.page';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdatePiecePageRoutingModule,
    ComponentsModule
  ],
  declarations: [UpdatePiecePage]
})
export class UpdatePiecePageModule { }
