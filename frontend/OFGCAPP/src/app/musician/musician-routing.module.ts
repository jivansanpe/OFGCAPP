import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MusicianPage } from './musician.page';

const routes: Routes = [
  {
    path: '',
    component: MusicianPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MusicianPageRoutingModule {}
