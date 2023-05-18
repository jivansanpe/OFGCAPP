import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotiListPageRoutingModule } from './noti-list-routing.module';

import { NotiListPage } from './noti-list.page';
import { ComponentsModule } from '../../../components/components.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotiListPageRoutingModule,
    ComponentsModule,
    Ng2SearchPipeModule
  ],
  declarations: [NotiListPage]
})
export class NotiListPageModule { }
