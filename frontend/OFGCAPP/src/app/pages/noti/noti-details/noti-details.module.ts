import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotiDetailsPageRoutingModule } from './noti-details-routing.module';

import { NotiDetailsPage } from './noti-details.page';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotiDetailsPageRoutingModule,
    ComponentsModule
  ],
  declarations: [NotiDetailsPage]
})
export class NotiDetailsPageModule { }
