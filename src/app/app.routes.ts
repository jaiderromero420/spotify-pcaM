import { Routes } from '@angular/router';
import { IntroGuard } from './guards/intro.guard';

export const routes: Routes = [
  {
    path: 'Home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage), canActivate: [IntroGuard]
  },
  {
    path: '',
    redirectTo: 'Home',
    pathMatch: 'full',
  },
  {
    path: 'intro',
    loadComponent: () => import('./intro/intro.page').then( m => m.IntroPage)
  },
];
