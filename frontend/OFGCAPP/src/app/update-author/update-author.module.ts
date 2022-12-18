import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateAuthorPageRoutingModule } from './update-author-routing.module';

import { UpdateAuthorPage } from './update-author.page';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateAuthorPageRoutingModule,
    ComponentsModule
  ],
  declarations: [UpdateAuthorPage]
})
export class UpdateAuthorPageModule { }
