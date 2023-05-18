import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewNotiPage } from './new-noti.page';

const routes: Routes = [
  {
    path: '',
    component: NewNotiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewNotiPageRoutingModule {}
