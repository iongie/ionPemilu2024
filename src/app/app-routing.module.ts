import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginGuard, authGuard, backGuard } from './guards/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule),
    canActivate: [LoginGuard]
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule),
    canActivate: [authGuard],
  },
  {
    path: 'dashboard',
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardPageModule),
        canActivate: [authGuard],
      },
      {
        path: ':id',
        loadChildren: () => import('./pages/dashboard-kategori/dashboard-kategori.module').then(m => m.DashboardKategoriPageModule),
        canActivate: [authGuard]
      }
    ]
  },
  {
    path: 'kategori-vote',
    children: [
      {
        path: ':id',
        loadChildren: () => import('./pages/kategori-vote/kategori-vote.module').then(m => m.KategoriVotePageModule),
        canActivate: [authGuard]
      }
    ]
  },
  {
    path: '**',
    loadChildren: () => import('./pages/page-not-found/page-not-found.module').then(m => m.PageNotFoundPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { 
      preloadingStrategy: PreloadAllModules,
      enableTracing: true
     })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
