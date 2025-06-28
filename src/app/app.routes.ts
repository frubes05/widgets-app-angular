import { Routes } from '@angular/router';
import { PokemonDetailsPageComponent } from '@pages/pokemon-details-page/pokemon-details-page.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', loadComponent: () => import('./pages/dashboard-page/dashboard-page.component').then(m => m.DashboardPageComponent) },
  { path: 'pokemon', loadComponent: () => import('./pages/pokemon-page/pokemon-page.component').then(m => m.PokemonPageComponent) },
  { path: 'pokemon/:name', component: PokemonDetailsPageComponent },
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
];
