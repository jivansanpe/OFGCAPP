import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewEventPageRoutingModule } from './new-event-routing.module';

import { NewEventPage } from './new-event.page';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewEventPageRoutingModule,
    ComponentsModule
  ],
  declarations: [NewEventPage]
})
export class NewEventPageModule { }
