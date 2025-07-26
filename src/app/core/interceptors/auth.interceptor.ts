import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  if (req.url.includes('/auth/register') || req.url.includes('/auth/login') || req.url.includes('/auth/logout')) {
    return next(req);
  }

  const accessToken = localStorage.getItem('accessToken');
  let authReq = req;
  if (accessToken) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        localStorage.removeItem('accessToken');
        return authService.refreshToken().pipe(
          switchMap((response) => {
            if (response && response.accessToken) {
              localStorage.setItem('accessToken', response.accessToken);
              const newAuthReq = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${response.accessToken}`,
                },
              });
              return next(newAuthReq);
            }
            return throwError(() => new Error('Failed to refresh access token'));
          })
        );
      }
      return throwError(() => error);
    })
  );
};
