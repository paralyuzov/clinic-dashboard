import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { guestGuard } from './core/guards/guest.guard';

export const routes: Routes = [
  {
    path:'',
    loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate:[authGuard]
  },
  {
    path:'register',
    loadComponent: () => import('./features/register/register.component').then(m => m.RegisterComponent),
    canActivate:[guestGuard]
  }
];
