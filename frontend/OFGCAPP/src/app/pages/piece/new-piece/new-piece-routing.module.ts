import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewPiecePage } from './new-piece.page';

const routes: Routes = [
  {
    path: '',
    component: NewPiecePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewPiecePageRoutingModule {}
