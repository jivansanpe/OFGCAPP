import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdatePiecePage } from './update-piece.page';

const routes: Routes = [
  {
    path: '',
    component: UpdatePiecePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdatePiecePageRoutingModule {}
