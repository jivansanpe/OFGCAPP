import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateMusicianPage } from './update-musician.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateMusicianPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateMusicianPageRoutingModule {}
