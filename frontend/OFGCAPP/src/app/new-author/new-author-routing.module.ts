import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewAuthorPage } from './new-author.page';

const routes: Routes = [
  {
    path: '',
    component: NewAuthorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewAuthorPageRoutingModule {}
