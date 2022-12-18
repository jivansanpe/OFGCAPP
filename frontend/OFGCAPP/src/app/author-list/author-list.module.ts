import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuthorListPageRoutingModule } from './author-list-routing.module';

import { AuthorListPage } from './author-list.page';
import { ComponentsModule } from '../components/components.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AuthorListPageRoutingModule,
    ComponentsModule,
    Ng2SearchPipeModule
  ],
  declarations: [AuthorListPage]
})
export class AuthorListPageModule { }
