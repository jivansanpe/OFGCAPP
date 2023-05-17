import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateNotiPage } from './update-noti.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateNotiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateNotiPageRoutingModule {}
