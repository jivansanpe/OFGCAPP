import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewMusicianPage } from './new-musician.page';

const routes: Routes = [
  {
    path: '',
    component: NewMusicianPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewMusicianPageRoutingModule {}
