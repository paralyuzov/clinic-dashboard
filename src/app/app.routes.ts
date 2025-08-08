import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { guestGuard } from './core/guards/guest.guard';
import { adminGuard } from './core/guards/admin.guard';
import { employeeGuard } from './core/guards/employee.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
    canActivate: [authGuard, adminGuard],
  },
  {
    path: 'employee-dashboard',
    loadComponent: () =>
      import('./features/employee-dashboard/employee-dashboard.component').then(
        (m) => m.EmployeeDashboardComponent
      ),
    canActivate: [authGuard, employeeGuard],
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./features/register/register.component').then(
        (m) => m.RegisterComponent
      ),
    canActivate: [guestGuard],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/login/login.component').then((m) => m.LoginComponent),
    canActivate: [guestGuard],
  },
];
