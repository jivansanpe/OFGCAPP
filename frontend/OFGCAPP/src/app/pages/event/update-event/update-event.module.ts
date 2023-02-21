import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateEventPageRoutingModule } from './update-event-routing.module';

import { UpdateEventPage } from './update-event.page';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateEventPageRoutingModule,
    ComponentsModule
  ],
  declarations: [UpdateEventPage]
})
export class UpdateEventPageModule { }
