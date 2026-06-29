import { Routes } from '@angular/router';
import { Dashboard } from './components/dashboard/dashboard';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { 
    path: 'login', 
    loadComponent: () => import('./components/login/login').then(m => m.Login), 
    title: 'Login - Cozy Game Tracker' 
  },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { 
    path: 'dashboard', 
    component: Dashboard, 
    canActivate: [authGuard],
    title: 'Dashboard - Cozy Game Tracker' 
  },
  { 
    path: 'library', 
    loadComponent: () => import('./components/library/library').then(m => m.Library), 
    canActivate: [authGuard],
    title: 'Library - Cozy Game Tracker' 
  },
  { 
    path: 'game/new', 
    loadComponent: () => import('./components/game-form/game-form').then(m => m.GameForm), 
    canActivate: [authGuard],
    title: 'Add Game - Cozy Game Tracker' 
  },
  { 
    path: 'game/:id', 
    loadComponent: () => import('./components/game-form/game-form').then(m => m.GameForm), 
    canActivate: [authGuard],
    title: 'Edit Game - Cozy Game Tracker' 
  },
  { path: '**', redirectTo: 'dashboard' }
];

