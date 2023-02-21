import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PieceListPage } from './piece-list.page';

const routes: Routes = [
  {
    path: '',
    component: PieceListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PieceListPageRoutingModule {}
