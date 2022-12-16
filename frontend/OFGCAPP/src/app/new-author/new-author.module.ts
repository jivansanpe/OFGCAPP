import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewAuthorPageRoutingModule } from './new-author-routing.module';

import { NewAuthorPage } from './new-author.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewAuthorPageRoutingModule
  ],
  declarations: [NewAuthorPage]
})
export class NewAuthorPageModule {}
