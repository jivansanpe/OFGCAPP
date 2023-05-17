import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotiListPage } from './noti-list.page';

const routes: Routes = [
  {
    path: '',
    component: NotiListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotiListPageRoutingModule {}
