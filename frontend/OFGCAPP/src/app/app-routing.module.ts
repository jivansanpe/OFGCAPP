import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'event-list',
    loadChildren: () => import('./pages/event/event-list/event-list.module').then(m => m.EventListPageModule)
  },
  {
    path: 'event-details/:id',
    loadChildren: () => import('./pages/event/event-details/event-details.module').then(m => m.EventDetailsPageModule)
  },
  {
    path: 'musician-details/:id',
    loadChildren: () => import('./pages/musician/musician-details/musician-details.module').then(m => m.MusicianPageModule)
  },
  {
    path: 'author-details/:id',
    loadChildren: () => import('./pages/author/author-details/author-details.module').then(m => m.AuthorDetailsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'new-event',
    loadChildren: () => import('./pages/event/new-event/new-event.module').then(m => m.NewEventPageModule)
  },
  {
    path: 'new-author',
    loadChildren: () => import('./pages/author/new-author/new-author.module').then(m => m.NewAuthorPageModule)
  },
  {
    path: 'new-musician',
    loadChildren: () => import('./pages/musician/new-musician/new-musician.module').then(m => m.NewMusicianPageModule)
  },
  {
    path: 'new-piece',
    loadChildren: () => import('./pages/piece/new-piece/new-piece.module').then(m => m.NewPiecePageModule)
  },
  {
    path: 'author-list',
    loadChildren: () => import('./pages/author/author-list/author-list.module').then(m => m.AuthorListPageModule)
  },
  {
    path: 'update-author/:id',
    loadChildren: () => import('./pages/author/update-author/update-author.module').then(m => m.UpdateAuthorPageModule)
  },
  {
    path: 'musician-list',
    loadChildren: () => import('./pages/musician/musician-list/musician-list.module').then(m => m.MusicianListPageModule)
  },
  {
    path: 'update-musician/:id',
    loadChildren: () => import('./pages/musician/update-musician/update-musician.module').then(m => m.UpdateMusicianPageModule)
  },
  {
    path: 'piece-list',
    loadChildren: () => import('./pages/piece/piece-list/piece-list.module').then(m => m.PieceListPageModule)
  },
  {
    path: 'piece-details/:id',
    loadChildren: () => import('./pages/piece/piece-details/piece-details.module').then(m => m.PieceDetailsPageModule)
  },
  {
    path: 'update-piece/:id',
    loadChildren: () => import('./pages/piece/update-piece/update-piece.module').then(m => m.UpdatePiecePageModule)
  },
  {
    path: 'update-event/:id',
    loadChildren: () => import('./pages/event/update-event/update-event.module').then(m => m.UpdateEventPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, onSameUrlNavigation: 'reload' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
