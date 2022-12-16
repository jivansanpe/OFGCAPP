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
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'new-event',
    loadChildren: () => import('./new-event/new-event.module').then( m => m.NewEventPageModule)
  },
  {
    path: 'new-author',
    loadChildren: () => import('./new-author/new-author.module').then( m => m.NewAuthorPageModule)
  },
  {
    path: 'new-musician',
    loadChildren: () => import('./new-musician/new-musician.module').then( m => m.NewMusicianPageModule)
  },
  {
    path: 'new-piece',
    loadChildren: () => import('./new-piece/new-piece.module').then( m => m.NewPiecePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
