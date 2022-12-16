import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewPiecePageRoutingModule } from './new-piece-routing.module';

import { NewPiecePage } from './new-piece.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewPiecePageRoutingModule
  ],
  declarations: [NewPiecePage]
})
export class NewPiecePageModule {}
