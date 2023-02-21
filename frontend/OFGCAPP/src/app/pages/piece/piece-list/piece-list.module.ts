import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PieceListPageRoutingModule } from './piece-list-routing.module';

import { PieceListPage } from './piece-list.page';
import { ComponentsModule } from '../../../components/components.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PieceListPageRoutingModule,
    ComponentsModule,
    Ng2SearchPipeModule
  ],
  declarations: [PieceListPage]
})
export class PieceListPageModule { }
