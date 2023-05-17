import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateNotiPageRoutingModule } from './update-noti-routing.module';

import { UpdateNotiPage } from './update-noti.page';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateNotiPageRoutingModule,
    ComponentsModule
  ],
  declarations: [UpdateNotiPage]
})
export class UpdateNotiPageModule { }
