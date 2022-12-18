import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'event-list',
    loadChildren: () => import('./event-list/event-list.module').then(m => m.EventListPageModule)
  },
  {
    path: 'event-details/:id',
    loadChildren: () => import('./event-details/event-details.module').then(m => m.EventDetailsPageModule)
  },
  {
    path: 'musician/:id',
    loadChildren: () => import('./musician/musician.module').then(m => m.MusicianPageModule)
  },
  {
    path: 'author-details/:id',
    loadChildren: () => import('./author-details/author-details.module').then(m => m.AuthorDetailsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'new-event',
    loadChildren: () => import('./new-event/new-event.module').then(m => m.NewEventPageModule)
  },
  {
    path: 'new-author',
    loadChildren: () => import('./new-author/new-author.module').then(m => m.NewAuthorPageModule)
  },
  {
    path: 'new-musician',
    loadChildren: () => import('./new-musician/new-musician.module').then(m => m.NewMusicianPageModule)
  },
  {
    path: 'new-piece',
    loadChildren: () => import('./new-piece/new-piece.module').then(m => m.NewPiecePageModule)
  },
  {
    path: 'author-list',
    loadChildren: () => import('./author-list/author-list.module').then(m => m.AuthorListPageModule)
  },
  {
    path: 'update-author/:id',
    loadChildren: () => import('./update-author/update-author.module').then(m => m.UpdateAuthorPageModule)
  },
  {
    path: 'musician-list',
    loadChildren: () => import('./musician-list/musician-list.module').then(m => m.MusicianListPageModule)
  },
  {
    path: 'update-musician/:id',
    loadChildren: () => import('./update-musician/update-musician.module').then(m => m.UpdateMusicianPageModule)
  },
  {
    path: 'piece-list',
    loadChildren: () => import('./piece-list/piece-list.module').then(m => m.PieceListPageModule)
  },
  {
    path: 'piece-details/:id',
    loadChildren: () => import('./piece-details/piece-details.module').then(m => m.PieceDetailsPageModule)
  },
  {
    path: 'update-piece/:id',
    loadChildren: () => import('./update-piece/update-piece.module').then(m => m.UpdatePiecePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, onSameUrlNavigation: 'reload' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
