import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { inject } from '@angular/core';
import { map, take, filter } from 'rxjs/operators';

export const employeeGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);

  if (!userService.currentUser && localStorage.getItem('accessToken')) {
    userService.verifyUser();
  }

  return userService.user$.pipe(
    filter(user => user !== null),
    take(1),
    map(user => {

      if (user?.role === 'admin') {
        router.navigate(['/']);
        return false;
      }

      return true;
    })
  );
};
