import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MusicianListPageRoutingModule } from './musician-list-routing.module';

import { MusicianListPage } from './musician-list.page';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MusicianListPageRoutingModule,
    ComponentsModule
  ],
  declarations: [MusicianListPage]
})
export class MusicianListPageModule { }
