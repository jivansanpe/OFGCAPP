import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventListPageRoutingModule } from './event-list-routing.module';

import { EventListPage } from './event-list.page';
import { ComponentsModule } from '../../../components/components.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventListPageRoutingModule,
    ComponentsModule,
    Ng2SearchPipeModule
  ],
  declarations: [EventListPage]
})
export class EventListPageModule { }
