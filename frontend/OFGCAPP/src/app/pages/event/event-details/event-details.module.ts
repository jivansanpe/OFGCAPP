import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventDetailsPageRoutingModule } from './event-details-routing.module';

import { EventDetailsPage } from './event-details.page';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventDetailsPageRoutingModule,
    ComponentsModule
  ],
  declarations: [EventDetailsPage]
})
export class EventDetailsPageModule { }
