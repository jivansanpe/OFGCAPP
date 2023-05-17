import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotiDetailsPage } from './noti-details.page';

const routes: Routes = [
  {
    path: '',
    component: NotiDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotiDetailsPageRoutingModule { }
