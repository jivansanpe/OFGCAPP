import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PieceDetailsPage } from './piece-details.page';

const routes: Routes = [
  {
    path: '',
    component: PieceDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PieceDetailsPageRoutingModule {}
