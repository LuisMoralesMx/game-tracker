import { Routes } from '@angular/router';
import { Dashboard } from './components/dashboard/dashboard';
import { Library } from './components/library/library';
import { GameForm } from './components/game-form/game-form';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: Dashboard, title: 'Dashboard - Cozy Game Tracker' },
  { path: 'library', component: Library, title: 'Library - Cozy Game Tracker' },
  { path: 'game/new', component: GameForm, title: 'Add Game - Cozy Game Tracker' },
  { path: 'game/:id', component: GameForm, title: 'Edit Game - Cozy Game Tracker' },
  { path: '**', redirectTo: 'dashboard' }
];
