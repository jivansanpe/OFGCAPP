import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthorListPage } from './author-list.page';

const routes: Routes = [
  {
    path: '',
    component: AuthorListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthorListPageRoutingModule {}
