import { Routes } from '@angular/router';
import { Dashboard } from './components/dashboard/dashboard';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: Dashboard, title: 'Dashboard - Cozy Game Tracker' },
  { 
    path: 'library', 
    loadComponent: () => import('./components/library/library').then(m => m.Library), 
    title: 'Library - Cozy Game Tracker' 
  },
  { 
    path: 'game/new', 
    loadComponent: () => import('./components/game-form/game-form').then(m => m.GameForm), 
    title: 'Add Game - Cozy Game Tracker' 
  },
  { 
    path: 'game/:id', 
    loadComponent: () => import('./components/game-form/game-form').then(m => m.GameForm), 
    title: 'Edit Game - Cozy Game Tracker' 
  },
  { path: '**', redirectTo: 'dashboard' }
];
