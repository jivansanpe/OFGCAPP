import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewNotiPageRoutingModule } from './new-noti-routing.module';

import { NewNotiPage } from './new-noti.page';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewNotiPageRoutingModule,
    ComponentsModule
  ],
  declarations: [NewNotiPage]
})
export class NewNotiPageModule { }
